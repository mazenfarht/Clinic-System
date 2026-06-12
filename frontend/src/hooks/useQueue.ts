import { useEffect, useMemo, useRef, useState } from "react";
import { getQueue } from "../services/queue";

export function useQueue() {
  const [queue, setQueue] = useState<any>({
    currentPatient: null,
    scheduled: [],
    waiting: [],
    done: [],
  });

  const [loading, setLoading] = useState(true);

  const isFirstLoad = useRef(true);

  const fetchQueue = async () => {
    try {
      if (isFirstLoad.current) setLoading(true);

      const data = await getQueue();
      // console.log(data);

      setQueue({
        currentPatient: data?.currentPatient || null,
        scheduled: data?.scheduled || [],
        waiting: data?.waiting || [],
        done: data?.done || [],
      });
    } catch (err) {
      console.log("Queue error:", err);
    } finally {
      setLoading(false);
      isFirstLoad.current = false;
    }
  };

  const fullQueue = useMemo(() => {
    return [
      ...queue.scheduled,
      ...(queue.currentPatient ? [queue.currentPatient] : []),
      ...queue.waiting,
      ...queue.done,
    ].sort((a, b) => a.queueNumber - b.queueNumber);
  }, [queue]);

  useEffect(() => {
    fetchQueue();

    const interval = setInterval(() => {
      fetchQueue();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return {
    queue,
    loading,
    refetch: fetchQueue,
    fullQueue,
  };
}
