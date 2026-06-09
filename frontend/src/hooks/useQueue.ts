import { useEffect, useRef, useState } from "react";
import { getQueue } from "../services/queue";

export function useQueue() {
  const [queue, setQueue] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const isFirstLoad = useRef(true);

  const fetchQueue = async () => {
    try {
      if (isFirstLoad.current) setLoading(true);

      const data = await getQueue();
      setQueue(data);
    } catch (err) {
      console.log("Queue error:", err);
    } finally {
      setLoading(false);
      isFirstLoad.current = false;
    }
  };

  useEffect(() => {
    fetchQueue();

    // optional: auto refresh every 10 sec
    const interval = setInterval(() => {
      fetchQueue();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return {
    queue,
    loading,
    refetch: fetchQueue,
  };
}
