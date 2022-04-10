import { useEffect, useState } from "react";
import axios from "axios";

import LeaderboardPresenter from "../presenters/LeaderboardPresenter";

import { IHistory } from "../models/IHistory";



function LeaderboardContainer() {
  const [histories, setHistories] = useState<IHistory[]>([]);

  useEffect(() => {
    axios.post('/api/getHistory')
      .then(response => {
        setHistories(response.data ?? []);
      })
 }, []);

  return (
    <LeaderboardPresenter
      histories={histories}
    />
  );
}

export default LeaderboardContainer;