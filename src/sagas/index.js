import { searchWatchers } from './Search';

export default function* rootWatchers() {
  yield [
    searchWatchers(),
  ];
}
