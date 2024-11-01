// 'use client'

import { useState, useEffect, useRef } from 'react';
import Button from './ui/Button';
import Switch from './ui/Switch';
import Tabs from './ui/Tabs';
import ScrollArea from './ui/ScrollArea';
import styles from './advancedStopWatch.module.scss';

// Material-UIのアイコン
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import FlagIcon from '@mui/icons-material/Flag';
import SaveIcon from '@mui/icons-material/Save';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import { Tabs } from '@mui/material';

export default function AdvancedStopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<{ time: number; overall: number }[]>([]);
  const [splitTime, setSplitTime] = useState(0);
  const [isDigital, setIsDigital] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [history, setHistory] = useState<{ time: number; laps: { time: number; overall: number }[] }[]>([]);
  const [selectedTab, setSelectedTab] = useState('laps');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
        setSplitTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }    }
      return () => {
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        }
      };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTime(0);
    setSplitTime(0);
    setLaps([]);
    setIsRunning(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleSessionReset = () => {
    setHistory([]);
  };

  const handleLap = () => {
    setLaps(prevLaps => [{ time: splitTime, overall: time }, ...prevLaps]);
    setSplitTime(0);
  };

  const handleSaveHistory = () => {
    setHistory(prevHistory => [{ time, laps }, ...prevHistory]);
    setLaps([]);
    setSplitTime(0);
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const milliseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
      <div className={styles.stopwatch}>
        <div className={styles.topBarContainer}>
          <div>
            <Switch checked={isDigital} onChange={(e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => setIsDigital(e.target.checked)} className={styles.switch} />
            <span className={styles.displayMode}>{isDigital ? 'Digital' : 'Analog'}</span>
          </div>
          <Button className={styles.brightness} onClick={() => setIsDarkMode(!isDarkMode)} variant="contained">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </Button>
        </div>

        <div style={{position: "relative"}}>
          <div className={styles.timeContainer}>
            <div className={styles.buttonGroup}>
              <Button onClick={handleReset} variant="outlined" className={styles.resetButton}>
                <RotateLeftIcon />
                Reset
              </Button>
              <Button onClick={handleLap} disabled={!isRunning} className={`
                ${styles.lapButton}
                ${isRunning? styles.start: styles.stop}
              `}>
                <FlagIcon />
                Lap
              </Button>
              <Button onClick={handleSaveHistory} variant="outlined"  className={styles.saveButton}>
                <SaveIcon />
                Save
              </Button>
              <Button onClick={handleSessionReset} variant="outlined" className={styles.historyResetButton}>
                <DeleteForeverIcon />
                Clear
              </Button>
            </div>

            <Button className={`
              ${styles.clockBorder}
              ${isRunning ? styles.isRunning : ""}
              ${isDarkMode ? styles.darkMode : ""}
            `} onClick={handleStartStop}>
              {isRunning
                ? <PauseRoundedIcon className={styles.playIcon}/>
                : <PlayArrowRoundedIcon className={styles.playIcon}/>
              }
              {isDigital ? (
                  <div className={`${styles.digitalDisplay} ${isDarkMode ? styles.darkMode : ""}`}>{formatTime(time)}</div>
                ) : (
                  <div className={styles.analogClock}>
                    <div className={styles.clockHand} style={{ transform: `rotate(${(time / 60000) * 360}deg)` }} />
                  </div>
                )}
              <div className={`${styles.splitTime}  ${isDarkMode ? styles.darkMode : ""}`}>Split Time<br/>{formatTime(splitTime)}</div>
            </Button>
          </div>


        </div>


        <Tabs defaultValue={selectedTab} onChange={handleTabChange} >
          <div  className={styles.tabsContainer}>
            <div className={styles.tabs}>
              <label
                className={`${styles.tab} ${selectedTab === "laps" ? styles.active: ""}`}
                onClick={() => setSelectedTab("laps")}
              >
                LAPS
              </label>
              <label
                className={`${styles.tab} ${selectedTab === "history" ? styles.active: ""}`}
                onClick={() => setSelectedTab("history")}
              >
                HISTORY
              </label>
            </div>
            <div className={styles.tabContent}>
              {selectedTab === "laps" ? (
                <ScrollArea className={styles.scrollArea}>
                  {laps.map((lap, index) => (
                    <div key={index} className={styles.lapItem}>
                      <span>Lap {laps.length - index}</span>
                      <span>{formatTime(lap.time)}</span>
                      <span>{formatTime(lap.overall)}</span>
                    </div>
                  ))}
                </ScrollArea>
              ) : (
                <ScrollArea className={styles.scrollArea}>
                  {history.map((item, index) => (
                    <div key={index} className={styles.historyItem}>
                      <span>Session {index + 1}: {formatTime(item.time)}</span>
                      <span>{item.laps.length} laps</span>
                    </div>
                  ))}
                </ScrollArea>
              )}
            </div>

          </div>
        </Tabs>
      </div>
    </div>
  );
}
