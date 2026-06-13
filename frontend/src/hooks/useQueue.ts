import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getQueue } from "../services/queue";
import { Patient } from "../types/patient";

export function useQueue(date: string) {
  const [queue, setQueue] = useState<{
    currentPatient: Patient | null;
    waiting: Patient[];
    done: Patient[];
  }>({
    currentPatient: null,
    waiting: [],
    done: [],
  });

  const [loading, setLoading] = useState(true);

  const isFirstLoad = useRef(true);

  // 🔥 Fetch queue
  const fetchQueue = useCallback(
    async (showLoading = false) => {
      try {
        if (showLoading) setLoading(true);

        const data = await getQueue(date);
        // console.log(data);

        setQueue({
          currentPatient: data?.currentPatient || null,
          waiting: data?.waiting || [],
          done: data?.done || [],
        });
      } catch (err) {
        console.log("Queue error:", err);
      } finally {
        if (showLoading) setLoading(false);
        isFirstLoad.current = false;
      }
    },
    [date]
  );

  // 🔁 initial + polling
  useEffect(() => {
    fetchQueue(true); // أول مرة loading

    const interval = setInterval(() => {
      fetchQueue(false); // silent refresh
    }, 10000);

    return () => clearInterval(interval);
  }, [fetchQueue]);

  // 📊 full queue
  const fullQueue = useMemo(() => {
    return [
      ...(queue.currentPatient ? [queue.currentPatient] : []),
      ...queue.waiting,
      ...queue.done,
    ];
  }, [queue]);

  return {
    queue,
    loading,
    refetch: () => fetchQueue(false),
    fullQueue,
  };
}
