/*
 * Copyright (c) 2024 Seanghay Yath
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
export class RichTextLayoutEngine {
  constructor() {
    this.segmenter = new Intl.Segmenter(undefined, {
      granularity: "word",
    });
  }

  /**
   * Create a block instance
   * @typedef {{draw: () => void, height: () => number}} RenderFunc
   * @typedef {{text: string, fontSize: number, fontFamily: string, fillStyle: string, fontWeight: string | number}} TextSpan
   * @typedef {{ lineHeight: number, left: number, top: number, textAlignment: "left" | "center" | "right", spans: TextSpan[] }} Options
   * @param {CanvasRenderingContext2D} ctx
   * @param {Options} options
   * @returns {RenderFunc}
   */
  create(ctx, { lineHeight, left, top, width, textAlignment, spans }) {
    const segments = [];
    let maxFontSize = 0;

    for (const _span of spans) {
      const span = {
        text: "",
        fontSize: 14,
        fontFamily: "sans-serif",
        fillStyle: "black",
        fontWeight: "400",
        ..._span,
      };

      if (span.fontSize > maxFontSize) {
        maxFontSize = span.fontSize;
      }

      for (const item of this.segmenter.segment(span.text)) {
        segments.push({
          segment: item.segment,
          ...span,
        });
      }
    }

    // draw text
    width += left;
    const safeMargin = 0;
    const maxWidth = width - safeMargin * 2;
    let textLeftOffset = safeMargin + left;
    let textTopOffset = safeMargin + top;

    const viewGroups = [];
    let views = [];
    let line = 0;

    for (const { segment, ...opts } of segments) {
      ctx.font =
        `${opts.fontWeight} ${opts.fontSize}px ${opts.fontFamily}`.trim();

      if (segment == "\n") {
        viewGroups.push({
          views,
          width: textLeftOffset - safeMargin * 2,
        });

        views = [];
        textLeftOffset = safeMargin + left;
        textTopOffset += maxFontSize * lineHeight;
        continue;
      }

      const measurement = ctx.measureText(segment);

      if (textLeftOffset + measurement.width - safeMargin > maxWidth) {
        viewGroups.push({
          views,
          width: textLeftOffset - safeMargin * 2,
        });

        textLeftOffset = safeMargin + left;
        textTopOffset += maxFontSize * lineHeight;
        line += 1;
        views = [];
      }

      // starting whitespace
      if (textLeftOffset - safeMargin == 0 && segment.trim().length == 0) {
        continue;
      }

      views.push({
        segment,
        textLeftOffset,
        textTopOffset,
        line,
        ...opts,
      });

      textLeftOffset += measurement.width;
    }

    viewGroups.push({
      views,
      width: textLeftOffset - safeMargin * 2,
    });

    return {
      height() {
        return textTopOffset - top + maxFontSize;
      },
      draw() {
        for (const group of viewGroups) {
          let leftOffset = 0;
          let localMaxFontSize = 0;

          for (const view of group.views) {
            if (localMaxFontSize < view.fontSize) {
              localMaxFontSize = view.fontSize;
            }
          }

          if (textAlignment === "center") {
            leftOffset = (maxWidth - group.width - safeMargin) / 2;
          }

          if (textAlignment === "right") {
            leftOffset = maxWidth - group.width - safeMargin;
          }

          for (const view of group.views) {
            ctx.font =
              `${view.fontWeight} ${view.fontSize}px ${view.fontFamily}`.trim();

            ctx.fillStyle = view.fillStyle;

            let topOffset = 0;
            if (view.fontSize !== localMaxFontSize) {
              topOffset = (localMaxFontSize - view.fontSize) / 2;
            }

            ctx.fillText(
              view.segment,
              leftOffset + view.textLeftOffset,
              topOffset + view.textTopOffset
            );
          }
        }
      },
    };
  }
}
