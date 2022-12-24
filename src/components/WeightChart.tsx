import { ResponsiveLine } from "@nivo/line";
import { useMemo } from "react";
import { lerpRange } from "../lib/util/lerp";
import type { WeightType } from "../models/WeightData";
import _ from "lodash";

interface Props {
  data: WeightType[];
}

const WeightChart = ({ data }: Props) => {
  const processedData = useMemo(() => {
    return [
      {
        id: "weights",
        color: "hsl(235, 70%, 50%)",
        data: data.map((item) => ({
          x: item.date,
          y: item.value,
        })),
      },
    ];
  }, [data]);

  const minMaxData = useMemo((): { min: number; max: number } => {
    if (processedData && data && data.length) {
      const min = _.min(data.map((item: WeightType) => item.value)) ?? 0;
      const max = _.max(data.map((item: WeightType) => item.value)) ?? 0;

      return {
        min,
        max,
      };
    }

    return {
      min: 0,
      max: 0,
    };
  }, [data, processedData]);

  const weightTickRange = useMemo(() => {
    if (minMaxData.max !== minMaxData.min) {
      return lerpRange(minMaxData.min, minMaxData.max, 5);
    }

    return [minMaxData.min];
  }, [minMaxData]);

  const DATE_FORMAT = "%Y-%m-%dT%H:%M:%S.%L%Z";

  return (
    <div className="h-48">
      <ResponsiveLine
        data={processedData}
        margin={{
          top: 20,
          right: 30,
          bottom: 60,
          left: 60,
        }}
        lineWidth={4}
        axisBottom={{
          format: "%d/%m",
          tickRotation: 45,
          tickValues: "every day",
          legend: "Date",
          legendOffset: 40,
          legendPosition: "middle",
        }}
        xScale={{
          type: "time",
          format: DATE_FORMAT,
          precision: "day",
        }}
        xFormat={`time:${DATE_FORMAT}`}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "Weight (kg)",
          legendOffset: -36,
          legendPosition: "middle",
          tickValues: weightTickRange,
        }}
      />
    </div>
  );
};

export default WeightChart;
