export default class ContactsMap {
    constructor(){
        this.map = null;
        this.mapData= null;
        this.mapContainer = document.getElementById('contact-map');
        this.mapDetailContainer = document.querySelector('.js-map-detail');
        this.city = document.querySelector('[data-city]');
        if(this.mapContainer){
            this.loadApi().then(()=>{
                this.init();
            })
        }
    }
    init(){
        ymaps.ready(()=>{
            this.initMap();
        });
    }
    getData(url){
        return fetch(url).then(result=>{
            return result.json();
        })
    }
    createPlacemark(data){
        const placemark = new ymaps.Placemark(data.coords, {
            balloonContent: data.title
        },
            {
                preset: 'islands#circleDotIcon',
                iconColor: '#E30613'
            });
        placemark.detailId =data.id;
        placemark.events.add('click',(event) => {
            this.showDetail(event.originalEvent.target.detailId);
        });
        return placemark;
    }
    loadApi(){
        return new Promise((resolve, reject) => {
            this.mapContainer.classList.add('state_loading');
            const url =`
            https://api-maps.yandex.ru/2.1/?apikey=${this.mapContainer.getAttribute('data-api-key')}&lang=${this.mapContainer.getAttribute('data-lang')}`;
            const mapScript = document.createElement('script');
            mapScript.type ='text/javascript';
            mapScript.src= url;
            document.body.appendChild(mapScript);
            mapScript.addEventListener('load',()=>{
                resolve();
            },false);
            mapScript.addEventListener('error',()=>{
                reject();
            },false)
        });
    }
    initMap(){
            this.map = new ymaps.Map('contact-map', {
                center: [62.059177, 98.872222],
                zoom: 3
            });
        this.getData(this.mapContainer.getAttribute('data-api')).then((data)=>{
            this.mapData = data;
            data.forEach(item=>{
                this.map.geoObjects.add(this.createPlacemark(item));
            });
            this.mapContainer.classList.remove('state_loading');
        });
        this.city.addEventListener('change',()=>{
            let coords = null;
            const id = String(this.city.value);
            this.showDetail(id);
            this.mapData.forEach((mapItem)=>{
               if(mapItem.id == id){
                   coords = mapItem.coords;
               }
            });

            const self = this;
            if (coords) {
                self.map.setZoom(12);
                self.map.panTo(coords, {
                    delay: 1500,
                    callback: function () {

                    }
                });
            }
        },false);
    }
    showDetail(id){
        this.getData(
            `${this.mapContainer.getAttribute('data-detail-api')}?id=${id}`
        ).then(data => {
            let template ='';
            data.forEach(item=>{
                template += this.renderContactItem(item);
            });
            this.mapDetailContainer.innerHTML = template;
        });
    }
    renderContactItem(data){
        return `
                <div class="contact-item contact-item_type-main">
                    <div class="contact-item__title">${data.title}
                    </div>
                    <div class="contact-item__address">${data.address}
                    </div>
                    ${this.renderList(data.list)}
                  </div>
        `
    }
    renderList(list){
        let  template ='';
        list.forEach(item=>{
            template += `
             <div class="contact-item__list">
                      <div class="contact-item__list-title">${item.title}
                      </div>
                      <ul class="contact-item__list-items">
                        ${this.renderListItems(item.list)}
                      </ul>
             </div>
        `
        });
        return template;
    }
    renderListItems(listitems){
        let  template ='';
        listitems.forEach(item=>{
            template += `
             <li class="contact-item__list-item">${item}</li>
                        `
        });
        return template;
    }
}