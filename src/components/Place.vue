<template>
    <div class="place">
            <div class="place-wrapper">
                <h3>Где мы находимся</h3>
                <div class="place-item" v-for="item in address" :key="item.id">
                    <div class="place-item-name" @click="selectMap = item.id" :class="{selName: selectMap === item.id}">
                        {{item.address}}   
                    </div>   
                </div>
                    <div class="place-map">
                        <div class="place-map_select" v-if="selectMap === 0">
                            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aad55f8b20be9515f2988ff8d451f7d1a379cc13cdc1ac2a3f860a963311c0084&amp;source=constructor"  frameborder="0"></iframe>
                        </div>
                        <div class="place-map_select" v-if="selectMap === 1">
                            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3Aee75196b03a5528ae130152cb71d65e8081cf3bffda51da9d3a908d93cdd4a60&amp;source=constructor"  frameborder="0"></iframe>
                        </div> 
                    </div>                              
            </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            selectMap: null,
            address: [
                {
                    'id': 0,
                    'address': 'Комендантский просп., 12, корп. 1',
                    'map': false
                },
                {
                    'id': 1,
                    'address': 'Проспект Наставников д. 45, к. 1',
                    'map': false
                }
            ]
        }
    },
}
</script>
