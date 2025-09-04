import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type TrendDirection = 'up' | 'down' | 'neutral';
type CardColor = 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'cyan';

@Component({
  selector: 'app-metric-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="h-full">
      <div class="card h-full mb-0">
        <div class="flex justify-between mb-4">
          <div>
            <span class="block text-muted-color font-medium mb-1">{{ title }}</span>
            <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
              {{ value }}
            </div>
          </div>
          <div class="flex items-center justify-center rounded-border w-10 h-10" [ngClass]="getIconContainerClass()">
            <i [class]="'pi ' + icon + ' text-xl'" [style.color]="getIconColor()"></i>
          </div>
        </div>
        <ng-container *ngIf="trendValue !== undefined">
          <span class="font-medium" [ngClass]="getTrendTextClass()">
            <i [class]="'pi ' + getTrendIcon()"></i>
            {{ trendValue }}
          </span>
          <span class="text-muted-color ml-1">{{ trendText }}</span>
        </ng-container>
      </div>
    </div>
  `
})
export class MetricCardComponent {
  @Input() title: string = '';
  @Input() value: string | number | null = '';
  @Input() icon: string = 'pi-chart-line';
  @Input() color: CardColor = 'blue';
  @Input() trendValue: string | number | null | undefined = undefined;
  @Input() trendDirection: TrendDirection = 'neutral';
  @Input() trendText: string = '';

  getIconContainerClass(): string {
    const base = 'flex items-center justify-center rounded-border';
    const colors = {
      blue: 'bg-blue-100 dark:bg-blue-400/10',
      green: 'bg-green-100 dark:bg-green-400/10',
      orange: 'bg-orange-100 dark:bg-orange-400/10',
      purple: 'bg-purple-100 dark:bg-purple-400/10',
      pink: 'bg-pink-100 dark:bg-pink-400/10',
      cyan: 'bg-cyan-100 dark:bg-cyan-400/10'
    };
    return `${base} ${colors[this.color]}`;
  }

  getIconColorClass(): string {
    const colors = {
      blue: 'text-blue-500',
      green: 'text-green-500',
      orange: 'text-orange-500',
      purple: 'text-purple-500',
      pink: 'text-pink-500',
      cyan: 'text-cyan-500'
    };
    return colors[this.color];
  }

  getIconColor(): string {
    const colors = {
      blue: '#3b82f6', // blue-500
      green: '#10b981', // green-500
      orange: '#f97316', // orange-500
      purple: '#8b5cf6', // purple-500
      pink: '#ec4899', // pink-500
      cyan: '#06b6d4' // cyan-500
    };
    return colors[this.color];
  }

  getTrendIcon(): string {
    return this.trendDirection === 'up' ? 'pi-arrow-up' : 'pi-arrow-down';
  }

  getTrendTextClass(): string {
    if (this.trendDirection === 'up') return 'text-green-500';
    if (this.trendDirection === 'down') return 'text-red-500';
    return 'text-muted-color';
  }
}
