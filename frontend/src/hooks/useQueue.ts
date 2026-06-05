import { useEffect, useState } from "react";
import { getQueue } from "../services/queue";

export function useQueue() {
  const [queue, setQueue] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchQueue = async () => {
    try {
      setLoading(true);
      const data = await getQueue();
      setQueue(data);
    } catch (err) {
      console.log("Queue error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  return { queue, loading, refetch: fetchQueue };
}
