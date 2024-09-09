import { MultiDirectedGraph } from './graphComponent';
import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';

export default function Graph() {
  return (
    <Suspense fallback={<CardsSkeleton />}>
      <MultiDirectedGraph style={{ height: '500px', width: '500px' }} />
    </Suspense>
  );
}
