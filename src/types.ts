/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type ModuleId = 'dashboard' | 'whatsapp' | 'email' | 'social' | 'settings';

export interface MessageTemplate {
  id: string;
  name: string;
  content: string;
}

export interface BroadcastSchedule {
  id: string;
  name: string;
  type: 'whatsapp' | 'email';
  startTime: string;
  intervalRange: [number, number]; // in seconds
  status: 'pending' | 'running' | 'completed' | 'paused';
}
