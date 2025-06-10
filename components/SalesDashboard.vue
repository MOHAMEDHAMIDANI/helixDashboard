<template>
    <div class="dashboard">
        <div class="dashboard-header">
            <h2>Sales & Revenue Analytics</h2>
            <div class="time-filters">
                <button @click="setTimeRange('week')" :class="{ active: timeRange === 'week' }">Weekly</button>
                <button @click="setTimeRange('month')" :class="{ active: timeRange === 'month' }">Monthly</button>
                <button @click="setTimeRange('year')" :class="{ active: timeRange === 'year' }">Yearly</button>
            </div>
        </div>
        <div class="metrics-grid">
            <MetricCard title="Total Revenue" :value="`DA${formatNumber(totalRevenue)}`" trend="up" :change="12.5" />
            <MetricCard title="New Customers" :value="formatNumber(totalCustomers)" trend="up" :change="8.2" />
            <MetricCard title="Avg. Order Value" :value="`DA${formatNumber(89.67)}`" trend="down" :change="3.4" />
            <MetricCard title="Conversion Rate" :value="`${formatNumber(conversionRate)}%`" trend="up" :change="1.1" />
        </div>
        <div class="chart-container">
            <canvas ref="combinedChart"></canvas>
        </div>
        <div class="secondary-charts">
            <div class="chart-wrapper">
                <h3>Revenue by Category</h3>
                <canvas ref="doughnutChart"></canvas>
            </div>
            <div class="chart-wrapper">
                <h3>Sales Funnel</h3>
                <canvas ref="funnelChart"></canvas>
            </div>
            <div class="chart-wrapper">
                <h3>Orders by Status</h3>
                <canvas ref="ordersByStatusChart"></canvas>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { Chart, registerables } from 'chart.js'
import annotationPlugin from 'chartjs-plugin-annotation'
Chart.register(...registerables, annotationPlugin)
const props = defineProps({
    darkMode: {
        type: Boolean,
        default: false
    }
})

const combinedChart = ref(null)
const doughnutChart = ref(null)
const funnelChart = ref(null)
const ordersByStatusChart = ref(null)
const timeRange = ref('month')
const chartData = ref({
    month: {
        labels: [],
        revenue: [],
        sales: [],
        categories: [],
        categoryRevenue: [],
        funnelLabels: [],
        funnelData: [],
        ordersByStatusLabels: [],
        ordersByStatusData: []
    },
    week: {
        labels: [],
        revenue: [],
        sales: [],
        categories: [],
        categoryRevenue: [],
        funnelLabels: [],
        funnelData: [],
        ordersByStatusLabels: [],
        ordersByStatusData: []
    },
    year: {
        labels: [],
        revenue: [],
        sales: [],
        categories: [],
        categoryRevenue: [],
        funnelLabels: [],
        funnelData: [],
        ordersByStatusLabels: [],
        ordersByStatusData: []
    }
})

const totalRevenue = computed(() => {
    const revenueData = chartData.value[timeRange.value]?.revenue
    return revenueData ? revenueData.reduce((a, b) => a + b, 0) : 0
})

const totalCustomers = ref(0)
const conversionRate = ref(0)

const setTimeRange = (range) => {
    timeRange.value = range
}

const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num)
}

const getChartTheme = () => ({
    textColor: props.darkMode ? '#E2E8F0' : '#4A5568',
    gridColor: props.darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    bgColor: props.darkMode ? '#1A202C' : '#FFFFFF'
})

const initCombinedChart = () => {
    const { labels, revenue, sales } = chartData.value[timeRange.value]
    const theme = getChartTheme()

    return new Chart(combinedChart.value, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Revenue (DA)',
                    data: revenue,
                    backgroundColor: 'rgba(56, 178, 172, 0.7)',
                    borderColor: 'rgba(56, 178, 172, 1)',
                    borderWidth: 1,
                    yAxisID: 'y',
                    type: 'bar'
                },
                {
                    label: 'Sales (Units)',
                    data: sales,
                    backgroundColor: 'rgba(237, 137, 54, 0.3)',
                    borderColor: 'rgba(237, 137, 54, 1)',
                    borderWidth: 2,
                    yAxisID: 'y1',
                    type: 'line',
                    tension: 0.4,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        color: theme.textColor
                    }
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: props.darkMode ? '#2D3748' : '#FFFFFF',
                    titleColor: theme.textColor,
                    bodyColor: theme.textColor,
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.dataset.yAxisID === 'y') {
                                label += `DA${formatNumber(context.raw)}`;
                            } else {
                                label += formatNumber(context.raw);
                            }
                            return label;
                        }
                    }
                },
                annotation: {
                    annotations: {
                        avgLine: {
                            type: 'line',
                            yMin: revenue.length > 0 ? revenue.reduce((a, b) => a + b, 0) / revenue.length : 0,
                            yMax: revenue.length > 0 ? revenue.reduce((a, b) => a + b, 0) / revenue.length : 0,
                            borderColor: 'rgba(245, 101, 101, 0.8)',
                            borderWidth: 2,
                            borderDash: [6, 6],
                            label: {
                                content: 'Average',
                                enabled: true,
                                position: 'right',
                                backgroundColor: 'transparent',
                                color: theme.textColor
                            }
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        color: theme.gridColor
                    },
                    ticks: {
                        color: theme.textColor
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    grid: {
                        color: theme.gridColor
                    },
                    ticks: {
                        color: theme.textColor,
                        callback: (value) => `DA${formatNumber(value)}`
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    grid: {
                        drawOnChartArea: false,
                        color: theme.gridColor
                    },
                    ticks: {
                        color: theme.textColor
                    }
                }
            }
        }
    })
}

const initDoughnutChart = () => {
    const { categories, categoryRevenue } = chartData.value[timeRange.value]
    const theme = getChartTheme()

    return new Chart(doughnutChart.value, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: categoryRevenue,
                backgroundColor: [
                    'rgba(66, 153, 225, 0.7)',
                    'rgba(102, 126, 234, 0.7)',
                    'rgba(159, 122, 234, 0.7)',
                    'rgba(237, 100, 166, 0.7)',
                    'rgba(56, 178, 172, 0.7)'
                ],
                borderColor: props.darkMode ? '#1A202C' : '#FFFFFF',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: theme.textColor
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += `DA${formatNumber(context.raw)}`;
                            return label;
                        }
                    }
                }
            }
        }
    })
}

const initFunnelChart = () => {
    const { funnelLabels, funnelData } = chartData.value[timeRange.value]
    const theme = getChartTheme()

    return new Chart(funnelChart.value, {
        type: 'bar',
        data: {
            labels: funnelLabels,
            datasets: [{
                label: 'Customers',
                data: funnelData,
                backgroundColor: 'rgba(99, 179, 237, 0.7)',
                borderColor: 'rgba(99, 179, 237, 1)',
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: props.darkMode ? '#2D3748' : '#FFFFFF',
                    titleColor: theme.textColor,
                    bodyColor: theme.textColor,
                    callbacks: {
                        label: (context) => {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            label += formatNumber(context.raw);
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: theme.gridColor
                    },
                    ticks: {
                        color: theme.textColor,
                        callback: (value) => formatNumber(value)
                    }
                },
                y: {
                    grid: {
                        color: theme.gridColor
                    },
                    ticks: {
                        color: theme.textColor
                    }
                }
            }
        }
    })
}

const orderStatusColors = {
    pending: '#ECC94B',
    processing: '#4299E1',
    shipped: '#48BB78',
    delivered: '#38B2AC',
    canceled: '#F56565',
    refunded: '#ED8936'
}

const initOrdersByStatusChart = () => {
    const { ordersByStatusLabels, ordersByStatusData } = chartData.value[timeRange.value]
    const theme = getChartTheme()

    const backgroundColors = ordersByStatusLabels.map(label => orderStatusColors[label.toLowerCase()] || '#CBD5E0')
    const borderColors = backgroundColors.map(color => color.replace('0.7', '1'))

    return new Chart(ordersByStatusChart.value, {
        type: 'pie',
        data: {
            labels: ordersByStatusLabels,
            datasets: [{
                data: ordersByStatusData,
                backgroundColor: backgroundColors,
                borderColor: borderColors,
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        color: theme.textColor
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (context) => {
                            const label = context.label || '';
                            const value = context.raw;
                            const total = context.dataset.data.reduce((sum, current) => sum + current, 0);
                            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
                            return `${label}: ${formatNumber(value)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    })
}

let combinedChartInstance = null
let doughnutChartInstance = null
let funnelChartInstance = null
let ordersByStatusChartInstance = null

const fetchSalesData = async (range) => {
    try {
        const salesResponse = await fetch(`http://localhost:3000/sales/sales-data?timeRange=${range}`)
        const salesData = await salesResponse.json()

        chartData.value[range] = {
            labels: salesData.labels,
            revenue: salesData.revenue,
            sales: salesData.sales || [],
            categories: salesData.categories || [],
            categoryRevenue: salesData.categoryRevenue || [],
            funnelLabels: salesData.funnelLabels || [],
            funnelData: salesData.funnelData || [],
            ordersByStatusLabels: salesData.ordersByStatusLabels || [],
            ordersByStatusData: salesData.ordersByStatusData || []
        }

        const metricsResponse = await fetch('http://localhost:3000/sales/dashboard-metrics')
        const metricsData = await metricsResponse.json()
        totalCustomers.value = metricsData.totalCustomers
        conversionRate.value = metricsData.conversionRate

        initAllCharts()
    } catch (error) {
        console.error('Error fetching sales data:', error)
    }
}

const initAllCharts = () => {
    if (combinedChartInstance) combinedChartInstance.destroy()
    if (doughnutChartInstance) doughnutChartInstance.destroy()
    if (funnelChartInstance) funnelChartInstance.destroy()
    if (ordersByStatusChartInstance) ordersByStatusChartInstance.destroy()

    if (chartData.value[timeRange.value].labels.length > 0) {
        combinedChartInstance = initCombinedChart()
        doughnutChartInstance = initDoughnutChart()
        funnelChartInstance = initFunnelChart()
        ordersByStatusChartInstance = initOrdersByStatusChart()
    }
}

watch([timeRange, () => props.darkMode, chartData], () => {
    initAllCharts()
})

onMounted(() => {
    fetchSalesData(timeRange.value)
})
</script>

<style scoped>
.dashboard {
    font-family: 'Inter', sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem;
    color: var(--text-color);
}

.dashboard-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.dashboard-header h2 {
    font-size: 1.5rem;
    font-weight: 600;
}

.time-filters button {
    background: none;
    border: 1px solid var(--border-color);
    padding: 0.5rem 1rem;
    margin-left: 0.5rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}

.time-filters button:hover {
    background: var(--hover-bg);
}

.time-filters button.active {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

.metrics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.chart-container {
    height: 400px;
    margin-bottom: 2rem;
    background: var(--chart-bg);
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.secondary-charts {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}

.chart-wrapper {
    height: 300px;
    background: var(--chart-bg);
    border-radius: 8px;
    padding: 1rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.chart-wrapper h3 {
    font-size: 1rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
}

:root {
    --text-color: #2D3748;
    --border-color: #E2E8F0;
    --hover-bg: #EDF2F7;
    --primary-color: #4299E1;
    --chart-bg: #FFFFFF;
}

.dark {
    --text-color: #E2E8F0;
    --border-color: #4A5568;
    --hover-bg: #2D3748;
    --primary-color: #63B3ED;
    --chart-bg: #2D3748;
}
</style>