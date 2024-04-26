import {
  AfterViewChecked,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  TemplateRef,
  Renderer2,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'ui-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements AfterViewChecked {
  @ViewChild('gridTable', { static: true }) gridTable: ElementRef | null = null;
  // @Output() scrollEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  // @Input() isScrollTop = {};
  // device: TDevice | null = null;
  // private observer: ResizeObserver | null = null;
  // isHasScroll = false;

  @Input() datas!: Array<any>;
  @Input() titles!: TemplateRef<any>;
  @Input() datarow!: TemplateRef<any>;

  constructor(private cdr: ChangeDetectorRef, private renderer: Renderer2) {}

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }
}
