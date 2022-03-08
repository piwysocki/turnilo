/*
 * Copyright 2017-2022 Allegro.pl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as React from "react";
import { ChartProps } from "../../../common/models/chart-props/chart-props";

import { GridLines } from "../../components/grid-lines/grid-lines";
import { XAxis } from "./x-axis";

import { Point } from "./point";
import { HoveredPoint } from "./scatterplot";
import { Tooltip } from "./tooltip";
import { calculateBeeswarmXAxisStage, getBeeswarmData, getPoints } from "./utils/get-beeswarm-data";

const TICK_SIZE = 10;

interface BeeswarmChartProps  extends ChartProps {
  hoveredPoint: HoveredPoint | null;
  setPointHover(point: HoveredPoint): void;
  resetPointHover(): void;
}

export class BeeswarmChart extends React.Component<BeeswarmChartProps, {}> {
  render() {
    const { data, essence, stage, setPointHover, resetPointHover, hoveredPoint } = this.props;
    const { plottingStage, scale, series, ticks, beeswarmData } = getBeeswarmData(data, essence, stage);
    const splitKey = essence.splits.splits.first().toKey();

    const points = getPoints({ data: beeswarmData, series, scale, pointRadius: 3, stage: plottingStage });

    return <div className="scatterplot-container" style={stage.getWidthHeight()}>
      <span className="axis-title axis-title-x" style={{ bottom: 150, right: 10 }}>{series.title()}</span>
      <Tooltip
        hoveredPoint={hoveredPoint}
        stage={plottingStage}
        xSeries={series}
        splitKey={splitKey}
        timezone={essence.timezone}
        showPrevious={essence.hasComparison()}/>
      <svg viewBox={stage.getViewBox()}>
        <GridLines orientation={"vertical"} stage={plottingStage} ticks={ticks} scale={scale}/>
        <XAxis
          scale={scale}
          stage={calculateBeeswarmXAxisStage(plottingStage)}
          ticks={ticks}
          formatter={series.formatter()}
          tickSize={TICK_SIZE}/>
        <g transform={plottingStage.getTransform()}>
          {points.map((datum, index) =>
            <Point key={index} datum={datum.data} x={datum.x} y={datum.y} r={datum.r} setHover={setPointHover} resetHover={resetPointHover}/>
          )}
        </g>
      </svg>
    </div>;
    }
  }