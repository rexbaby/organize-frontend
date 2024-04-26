import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'ui-mask',
  templateUrl: './mask.component.html',
  styleUrls: ['./mask.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaskComponent implements AfterViewChecked {
  @Input() maskPanelClass = '';
  @Input() contentPanelClass = '';
  @Input() visible = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
}
