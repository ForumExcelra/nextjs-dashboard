import NodeImage from './SigmaContainer';
import { Suspense } from 'react';
import { CardsSkeleton } from '@/app/ui/skeletons';

export default function Graph() {
  return (
    <Suspense fallback={<CardsSkeleton />}>
      <NodeImage />
    </Suspense>
  );
}
