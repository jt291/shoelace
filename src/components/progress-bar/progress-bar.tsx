import { Component, Prop, h } from '@stencil/core';

/**
 * @since 1.0.0
 * @status ready
 *
 * @slot - A label to show inside the indicator.
 */

@Component({
  tag: 'sl-progress-bar',
  styleUrl: 'progress-bar.scss',
  shadow: true
})
export class ProgressBar {
  /** The progress bar's percentage, 0 to 100. */
  @Prop() percentage = 0;

  /** The height of the progress bar in pixels. */
  @Prop() height = 6;

  render() {
    return (
      <div
        class="sl-progress-bar"
        style={{
          '--height': `${this.height}px`
        }}
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={this.percentage}
      >
        <div
          class="sl-progress-bar__indicator"
          style={{
            width: `${this.percentage}%`
          }}
        >
          <span class="sl-progress-bar__label">
            <slot />
          </span>
        </div>
      </div>
    );
  }
}
