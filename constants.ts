import { Channel } from './types';

export const CHANNELS: Channel[] = [
  { id: 1, name: 'Next TV (壹電視)', status: 'recording', color: 'from-red-900 to-red-950' },
  { id: 2, name: 'TTV News HD (台視新聞)', status: 'recording', color: 'from-blue-900 to-blue-950' },
  { id: 3, name: 'USTV (寰宇新聞)', status: 'recording', color: 'from-indigo-900 to-indigo-950' },
  { id: 4, name: 'CTV News (中視新聞)', status: 'recording', color: 'from-orange-900 to-orange-950' },
  { id: 5, name: 'CTS News (華視新聞)', status: 'recording', color: 'from-emerald-900 to-emerald-950' },
  { id: 6, name: 'PTS 13 (公視13頻道)', status: 'error', color: 'from-gray-800 to-gray-900' },
  { id: 7, name: 'FTV News (民視新聞)', status: 'recording', color: 'from-cyan-900 to-cyan-950' },
  { id: 8, name: 'CTi News (中天)', status: 'recording', color: 'from-blue-800 to-blue-900' },
  { id: 9, name: 'SET LIVE (三立)', status: 'recording', color: 'from-green-900 to-green-950' },
  { id: 10, name: 'TVBS News', status: 'recording', color: 'from-purple-900 to-purple-950' },
  { id: 11, name: 'EBC News (東森)', status: 'recording', color: 'from-yellow-900 to-yellow-950' },
];