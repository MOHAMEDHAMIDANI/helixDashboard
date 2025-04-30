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
            <MetricCard title="Total Revenue" :value="`$${formatNumber(totalRevenue)}`" trend="up" :change="12.5" />
            <MetricCard title="New Customers" :value="formatNumber(245)" trend="up" :change="8.2" />
            <MetricCard title="Avg. Order Value" :value="`$${formatNumber(89.67)}`" trend="down" :change="3.4" />
            <MetricCard title="Conversion Rate" :value="`${formatNumber(2.8)}%`" trend="up" :change="1.1" />
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
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
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
const timeRange = ref('month')
const chartData = {
    month: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        revenue: [12500, 18900, 17800, 21000, 23400, 27800, 31200, 29500, 28700, 32100, 35600, 38900],
        sales: [142, 201, 178, 210, 234, 278, 312, 295, 287, 321, 356, 389],
        categories: ['Electronics', 'Apparel', 'Home Goods', 'Accessories'],
        categoryRevenue: [154200, 87600, 65300, 43200],
        funnel: [1000, 750, 450, 200, 120]
    },
    week: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        revenue: [4200, 5800, 5100, 6700, 8200, 10500, 9200],
        sales: [42, 58, 51, 67, 82, 105, 92],
        categories: ['Electronics', 'Apparel', 'Home Goods'],
        categoryRevenue: [28700, 15600, 9800],
        funnel: [350, 280, 190, 85, 45]
    }
}
const totalRevenue = computed(() => {
    return chartData[timeRange.value].revenue.reduce((a, b) => a + b, 0)
})

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
    const { labels, revenue, sales } = chartData[timeRange.value]
    const theme = getChartTheme()

    return new Chart(combinedChart.value, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                {
                    label: 'Revenue ($)',
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
                    bodyColor: theme.textColor
                },
                annotation: {
                    annotations: {
                        avgLine: {
                            type: 'line',
                            yMin: revenue.reduce((a, b) => a + b, 0) / revenue.length,
                            yMax: revenue.reduce((a, b) => a + b, 0) / revenue.length,
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
                        callback: (value) => `$${formatNumber(value)}`
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
    const { categories, categoryRevenue } = chartData[timeRange.value]
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
                    'rgba(237, 100, 166, 0.7)'
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
                            const label = context.label || ''
                            const value = context.raw || 0
                            const total = context.dataset.data.reduce((a, b) => a + b, 0)
                            const percentage = Math.round((value / total) * 100)
                            return `${label}: $${formatNumber(value)} (${percentage}%)`
                        }
                    },
                    backgroundColor: props.darkMode ? '#2D3748' : '#FFFFFF',
                    titleColor: theme.textColor,
                    bodyColor: theme.textColor
                }
            },
            cutout: '70%'
        }
    })
}

const initFunnelChart = () => {
    const { funnel } = chartData[timeRange.value]
    const theme = getChartTheme()

    return new Chart(funnelChart.value, {
        type: 'bar',
        data: {
            labels: ['Visits', 'Add to Cart', 'Initiate Checkout', 'Payment', 'Purchase'],
            datasets: [{
                data: funnel,
                backgroundColor: 'rgba(72, 187, 120, 0.6)',
                borderColor: 'rgba(72, 187, 120, 1)',
                borderWidth: 1,
                borderRadius: 4
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
                    backgroundColor: props.darkMode ? '#2D3748' : '#FFFFFF',
                    titleColor: theme.textColor,
                    bodyColor: theme.textColor
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

let combinedChartInstance = null
let doughnutChartInstance = null
let funnelChartInstance = null

onMounted(() => {
    combinedChartInstance = initCombinedChart()
    doughnutChartInstance = initDoughnutChart()
    funnelChartInstance = initFunnelChart()
})

watch([timeRange, () => props.darkMode], () => {
    if (combinedChartInstance) combinedChartInstance.destroy()
    if (doughnutChartInstance) doughnutChartInstance.destroy()
    if (funnelChartInstance) funnelChartInstance.destroy()

    combinedChartInstance = initCombinedChart()
    doughnutChartInstance = initDoughnutChart()
    funnelChartInstance = initFunnelChart()
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

/* Dark mode variables */
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