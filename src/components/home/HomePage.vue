<template>
  <div class="container">
    <div class="analizing">
      <h1>Главная панель</h1>
      <div class="poisk-con">
        <input v-model="searchQuery" placeholder="Поиск" type="text">
        <img src="@/assets/notifications_none.svg" alt="уведомления">
        <img class="admin-logo" :src="currentUser.photo" alt="">
      </div>
    </div>
    <div class="analizing1">
      <div class="blocks">
        <div class="block">
          <h2>
            Пользователи
            <img class="icon" src="https://splendorous-granita-f826c7.netlify.app/icon2.png" alt="" />
          </h2>
          <div class="value" id="users-value">Загрузка...</div>
          <div class="description"><span id="users-description">Загрузка...</span> Up from yesterday</div>
        </div>
        <div class="block">
          <h2>
            Водители
            <img class="icon" src="https://splendorous-granita-f826c7.netlify.app/driver.png" alt="" />
          </h2>
          <div class="value" id="drivers-value">Загрузка...</div>
          <div class="description"><span id="drivers-description">Загрузка...</span> Up from yesterday</div>
        </div>
        <div class="block">
          <h2>
            Продажи
            <img class="icon" src="https://splendorous-granita-f826c7.netlify.app/sales.png" alt="" />
          </h2>
          <div class="value" id="sales-value">Загрузка...</div>
          <div class="description"><span id="sales-description">Загрузка...</span>Up from yesterday</div>
        </div>
        <div class="block">
          <h2>
            Заказы
            <img class="icon" src="https://splendorous-granita-f826c7.netlify.app/box.png" alt="" />
          </h2>
          <div class="value" id="orders-value">Загрузка...</div>
          <div class="description"><span id="orders-description">Загрузка...</span> Up from yesterday</div>
        </div>
      </div>
    </div>
    <div class="static_panel">
      <div class="static_new">
        <div id="container2"></div>
      </div>
      <div class="tariff">
        <div>
          <h3>Тарифы</h3>
          <router-link to="/Billing"><img src="./Right.svg" alt=""></router-link>
        </div>
        <div class="block_tariff">
          <div>
            <img src="./folder.svg" alt="">
          </div>
          <div>
            <h4>Старт</h4>
            <span id="start-orders">Загрузка...</span>
          </div>
        </div>
        <div class="block_tariff">
          <div>
            <img src="./folder.svg" alt="">
          </div>
          <div>
            <h4>Комфорт</h4>
            <span id="comfort-orders">Загрузка...</span>
          </div>
        </div>
        <div class="block_tariff">
          <div>
            <img src="./folder.svg" alt="">
          </div>
          <div>
            <h4>Бизнес</h4>
            <span id="business-orders">Загрузка...</span>
          </div>
        </div>
      </div>
    </div>
    <div class="static_panel_2">
      <div class="title-con">
        <div>
          <h2>Заказы по времени</h2>
        </div>
        <div>
          <h2>Лучшие водители</h2>
        </div>
      </div>
      <div class="calculations">
        <div class="dask">

          <div>
            <figure class="highcharts-figure">
              <div id="container1"></div>
            </figure>
          </div>
        </div>
        <div class="best_drive">
          <div class="card">
            <img src="https://randomuser.me/api/portraits/men/43.jpg" alt="Profile Picture" class="profile-img">
            <div class="info">
              <h2>Maharrm Hasanli</h2>
              <p class="phone">+998 (99) 436-46-15</p>
              <div class="stats">
                <div class="orders">
                  <span class="label">Заказы:</span>
                  <span class="value">1000</span>
                </div>
                <div class="income">
                  <span class="label">Доход:</span>
                  <span class="value">$ 98</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <img src="https://randomuser.me/api/portraits/men/53.jpg" alt="Profile Picture" class="profile-img">
            <div class="info">
              <h2>Maharrm Hasanli</h2>
              <p class="phone">+998 (99) 436-46-15</p>
              <div class="stats">
                <div class="orders">
                  <span class="label">Заказы:</span>
                  <span class="value">1000</span>
                </div>
                <div class="income">
                  <span class="label">Доход:</span>
                  <span class="value">$ 98</span>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <img src="https://randomuser.me/api/portraits/men/33.jpg" alt="Profile Picture" class="profile-img">
            <div class="info">
              <h2>Maharrm Hasanli</h2>
              <p class="phone">+998 (99) 436-46-15</p>
              <div class="stats">
                <div class="orders">
                  <span class="label">Заказы:</span>
                  <span class="value">1000</span>
                </div>
                <div class="income">
                  <span class="label">Доход:</span>
                  <span class="value">$ 98</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Highcharts from "highcharts";
import HCData from "highcharts/modules/data";
import HCExporting from "highcharts/modules/exporting";
import HCExportData from "highcharts/modules/export-data";
import HCAccessibility from "highcharts/modules/accessibility";
import axios from "axios";
import { mapGetters } from 'vuex';

HCData(Highcharts);
HCExporting(Highcharts);
HCExportData(Highcharts);
HCAccessibility(Highcharts);

import "./homePage.css";

export default {
  data() {
    return {
      defaultData: "https://demo-live-data.highcharts.com/time-data.csv",
      fetchURL: "https://demo-live-data.highcharts.com/time-data.csv",
      enablePolling: true,
      pollingTime: 2,
      chart1Id: 'container1',
      chart2Id: 'container2',
      searchQuery: '',
    };
  },
  computed: {
    ...mapGetters(['currentUser'])
  },
  mounted() {
    this.createChart(this.chart1Id);
    this.fetchData(this.chart2Id);
    this.loadData();
    this.loadOrderData();
  },
  methods: {
    createChart(containerId) {
      Highcharts.chart(containerId, {
        chart: {
          type: "areaspline",
        },
        accessibility: {
          announceNewData: {
            enabled: true,
            minAnnounceInterval: 15000,
            announcementFormatter: function (allSeries, newSeries, newPoint) {
              if (newPoint) {
                return "New point added. Value: " + newPoint.y;
              }
              return false;
            },
          },
        },
        plotOptions: {
          areaspline: {
            color: "#3366FF",
            fillColor: {
              linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
              stops: [
                [0, "#a3b6f1"],
                [1, "#d4d9e7"],
              ],
            },
            threshold: null,
            marker: {
              enabled: false,
              lineWidth: 1,
              lineColor: null,
              fillColor: "white",
            },
          },
        },
        data: {
          csvURL: this.fetchURL,
          enablePolling: this.enablePolling,
          dataRefreshRate: parseInt(this.pollingTime, 10),
        },
      });

      if (this.pollingTime < 1 || !this.pollingTime) {
        this.pollingTime = 1;
      }
    },

    fetchData(containerId) {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then(() => {
          const months = [
            "Январь",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь",
          ];
          const userData = Array.from({ length: 12 }, () =>
            Math.floor(Math.random() * 100000)
          );
          const driverData = Array.from({ length: 12 }, () =>
            Math.floor(Math.random() * 100000)
          );

          const chartOptions = {
            chart: {
              type: "column",
            },
            title: {
              text: "Статистика",
              align: "left",
            },
            xAxis: {
              categories: months,
              crosshair: true,
              accessibility: {
                description: "Месяцы",
              },
            },
            plotOptions: {
              column: {
                pointPadding: 0.2,
                borderWidth: 0,
              },
            },
            series: [
              {
                name: "Пользователи",
                data: userData,
              },
              {
                name: "Водители",
                data: driverData,
              },
            ],
          };

          Highcharts.chart(containerId, chartOptions);
        })
        .catch((error) => {
          console.error("Ошибка при получении данных:", error);
        });
    },

    loadData() {
      axios.get(this.fetchURL)
        .then(() => {
          // Используем тестовые данные
          const data = {
            users: { count: 4, change: 8.5 },
            drivers: { count: 3, change: 7.4 },
            sales: { count: 2, change: 6.3 },
            orders: { count: 1, change: 5.2 }
          };

          document.getElementById('users-value').textContent = data.users.count;
          document.getElementById('users-description').textContent = `${data.users.change}%`;

          document.getElementById('drivers-value').textContent = data.drivers.count;
          document.getElementById('drivers-description').textContent = `${data.drivers.change}%`;

          document.getElementById('sales-value').textContent = data.sales.count;
          document.getElementById('sales-description').textContent = `${data.sales.change}%`;

          document.getElementById('orders-value').textContent = data.orders.count;
          document.getElementById('orders-description').textContent = `${data.orders.change}%`;
        })
        .catch(error => {
          console.error('Ошибка при получении данных:', error);
        });
    },

    loadOrderData() {
      axios
        .get(this.fetchURL)
        .then(() => {
          // Используем тестовые данные
          const data = {
            tariffs: {
              start: Math.floor(Math.random() * 1000),
              comfort: Math.floor(Math.random() * 1000),
              business: Math.floor(Math.random() * 1000)
            }
          };
          document.getElementById('start-orders').textContent = `${data.tariffs.start} - заказы`;
          document.getElementById('comfort-orders').textContent = `${data.tariffs.comfort} - заказы`;
          document.getElementById('business-orders').textContent = `${data.tariffs.business} - заказы`;
        })
        .catch(error => {
          console.error('Ошибка при получении данных:', error);
        });
    }
  },
  watch: {
    fetchURL() {
      this.createChart(this.chart1Id);
    },
    enablePolling() {
      this.createChart(this.chart1Id);
    },
    pollingTime() {
      this.createChart(this.chart1Id);
    },
  },
};
</script>

