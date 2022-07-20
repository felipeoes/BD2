import ReactApexChart from "react-apexcharts";
import { Card, CardHeader, Box } from "@mui/material";
import { useTheme } from "styled-components";

function BaseOptionChart() {
  const theme = useTheme();

  const LABEL_TOTAL = {
    show: true,
    label: "Total",
    color: theme.colors.filterText,
    // ...theme.typography.subtitle2,
  };

  const LABEL_VALUE = {
    offsetY: 2,
    color: theme.colors.black60,
    // ...theme.typography.h3,
  };

  return {
    // Colors
    colors: [
      theme.colors.primary,
      theme.colors.secondary,
      theme.colors.terciary,
      theme.colors.lightRed,
      theme.colors.semiblack40,
      theme.colors.success,
    ],

    // Chart
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      // animations: { enabled: false },
      foreColor: theme.colors.disabledButton,
      fontFamily: "InterRegular",
    },

    // States
    states: {
      hover: {
        filter: {
          type: "lighten",
          value: 0.04,
        },
      },
      active: {
        filter: {
          type: "darken",
          value: 0.88,
        },
      },
    },

    // Fill
    fill: {
      opacity: 1,
      gradient: {
        type: "vertical",
        shadeIntensity: 0,
        opacityFrom: 0.4,
        opacityTo: 0,
        stops: [0, 100],
      },
    },

    // Datalabels
    dataLabels: { enabled: false },

    // Stroke
    stroke: {
      width: 3,
      curve: "smooth",
      lineCap: "round",
    },

    // Grid
    grid: {
      strokeDashArray: 3,
      borderColor: theme.colors.disabledButton,
    },

    // Xaxis
    xaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
    },

    // Markers
    markers: {
      size: 0,
      strokeColors: theme.colors.backgroundBlack,
    },

    // Tooltip
    tooltip: {
      x: {
        show: false,
      },
    },

    // Legend
    legend: {
      show: true,
      fontSize: 13,
      position: "top",
      horizontalAlign: "right",
      markers: {
        radius: 12,
      },
      fontWeight: 500,
      itemMargin: { horizontal: 4 },
      labels: {
        colors: theme.colors.black60,
      },
    },

    // plotOptions
    plotOptions: {
      // Bar
      bar: {
        columnWidth: "28%",
        borderRadius: 4,
      },
      // Pie + Donut
      pie: {
        donut: {
          labels: {
            show: true,
            value: LABEL_VALUE,
            total: LABEL_TOTAL,
          },
        },
      },
      // Radialbar
      radialBar: {
        track: {
          strokeWidth: "100%",
          background: theme.colors.semiGray,
        },
        dataLabels: {
          value: LABEL_VALUE,
          total: LABEL_TOTAL,
        },
      },
      // Radar
      radar: {
        polygons: {
          fill: { colors: ["transparent"] },
          strokeColors: theme.colors.disabledButton,
          connectorColors: theme.colors.disabledButton,
        },
      },
      // polarArea
      polarArea: {
        rings: {
          strokeColor: theme.colors.disabledButton,
        },
        spokes: {
          connectorColors: theme.colors.disabledButton,
        },
      },
    },

    // Responsive
    responsive: [
      {
        // sm
        breakpoint: 600,
        options: {
          plotOptions: { bar: { columnWidth: "40%" } },
        },
      },
      {
        // md
        breakpoint: 900,
        options: {
          plotOptions: { bar: { columnWidth: "32%" } },
        },
      },
    ],
  };
}

export default function Chart({
  title,
  subheader,
  chartLabels,
  chartData,
  ...props
}) {
  const otherOptions = {
    plotOptions: { bar: { columnWidth: "16%" } },
    fill: { type: chartData.map((i) => i.fill) },
    labels: chartLabels,
    xaxis: { type: "datetime" },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== "undefined") {
            // Checa se tem casa decimal
            if (y.toString().indexOf(".") > -1) {
              return `R$ ${y.toFixed(2)}`;
            }
            return `${y.toFixed(0)}`;
          }
          return y;
        },
      },
    },
  };
  const chartOptions = { ...BaseOptionChart(), ...otherOptions };

  return (
    <Card {...props}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ p: 1, pb: 1 }} dir="ltr">
        <ReactApexChart
          type="line"
          series={chartData}
          options={chartOptions}
          height={304}
        />
      </Box>
    </Card>
  );
}
