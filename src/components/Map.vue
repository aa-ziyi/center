<template>
  <div>
    当前点位的经度：{{ center[0].toFixed(2) }},纬度{{ center[1].toFixed(2) }}
    <el-amap
      ref="map"
      vid="amapDemo"
      :amap-manager="amapManager"
      :center="center"
      :zoom="zoom"
      :plugin="plugin"
      :events="events"
      class="amap-demo"
    >
      <el-amap-marker vid="amapDemo" :position="center"></el-amap-marker>
    </el-amap>
  </div>
</template>
<script>
import AMap from "vue-amap";
let amapManager = new AMap.AMapManager();
export default {
  props: {
    defaultCenter: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const self = this;
    return {
      amapManager,
      zoom: 12,
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      loaded: false,
      events: {
        init: (o) => {},
        click: (e) => {
          console.log(e);
          this.center = [e.lnglat.lng, e.lnglat.lat]; //点击选择新地址为中心点
          this.$emit("mark", this.center);
        },
      },
      plugin: [
        {
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 100, //超过10秒后停止定位，默认：无穷大
          maximumAge: 0, //定位结果缓存0毫秒，默认：0
          convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: true, //显示定位按钮，默认：true
          buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
          showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：f
          extensions: "all",
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.lng = result.position.lng;
                  self.lat = result.position.lat;
                }
                if (self.lng) {
                  self.center = [self.lng, self.lat];
                  self.loaded = true;
                  self.$nextTick();
                  self.$emit("init", self.center);
                }
              });
            },
          },
        },
        "ToolBar",
        {
          pName: "MapType",
          defaultType: 0,
          events: {
            init(o) {
              console.log(o);
            },
          },
        },
      ],
    };
  },
};
</script>
<style lang="less" scoped>
.amap-demo {
  height: 400px;
}
</style>
