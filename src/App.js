import { useEffect, useState } from 'react';
import './App.css';
import AudioList from './components/AudioList';
import FixFooter from './components/FixFooter';
import Header from './components/Header';
import SearchInput from './components/SearchInput';
import Tabs from './components/Tabs';

import { baseUrl } from "./config";

function App() {
  const [list, setList] = useState(false);
  const [appData, setAppData] = useState({});
  const [audioList, setAudioList] = useState([]);
  const [trackIndex, setTrackIndex] = useState(-1);

  const onItemSelect = (tab, type) => {
    if (tab in appData) {
      if (type in appData[tab]) {
        const audioList = appData[tab][type];
        setAudioList(audioList);
      } else {
        setAudioList([]);
      }
    } else {
      setAudioList([]);
    }
    setList(true);
  };

  const onBackButtonPress = () => {
    setList(false);
  };

  const onTrackSelect = (index) => {
    setTrackIndex(index);
  };

  useEffect(() => {
    fetch(`${baseUrl}/song`)
      .then((res) => res.json())
      .then((jsonResp) => {
        setAppData(jsonResp.appData);
      })
      .catch((error) => {
        console.log({ error });
      });
  }, []);

  return (
    <div className="App m-20">
      <Header />
      <h2 className="mtb-20 app-quote">La mejor musica para vos</h2>
      <SearchInput />
      <Tabs onItemSelect={onItemSelect} tabData={appData["homeScreen"]} />
      {list && (
        <AudioList
          audioList={audioList}
          onTrackSelect={onTrackSelect}
          onBackButtonPress={onBackButtonPress}
        />
      )} 
      <FixFooter trackIndex={trackIndex} audioList={audioList} />
    </div>
  );
}

export default App;
