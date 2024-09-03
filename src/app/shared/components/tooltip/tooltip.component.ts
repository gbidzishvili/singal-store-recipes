import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  standalone: true,
  imports: [],
  styles: `
   .tooltip {
      position: fixed;
      background-color: black;
      border-radius: 4px;
      color: #ffffff;
      font-family: Arial, sans-serif;
      padding: 3px 6px;
      font-size: 13px;
      margin-top: 5px;
      transform: translateX(-50%);
      z-index: 1000; /* Optional: Ensures tooltip is above other elements */
    }

    .tooltip::before {
      content: '';
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid black;
      position: absolute;
      left: calc(50% - 5px);
      top: -5px;
    }

  `,
  templateUrl: './tooltip.component.html',
})
export class TooltipComponent {
  @Input() text = '';
  @Input() left = 0;
  @Input() top = 0;
}
