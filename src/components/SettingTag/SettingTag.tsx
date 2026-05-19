import React, { useState } from 'react';

import { Tag } from '../Tag/Tag';
import ColorPicker from '../ColorPicker/ColorPicker';
import { SettingTagProps } from '../../types';

import styles from './SettingTag.module.css';

export const SettingTag: React.FC<SettingTagProps> = ({ label, color, onChange, testId = 'default' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentColor, setCurrentColor] = useState(color);
  const colorsOptions = ['red', 'orange', 'yellow', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'];

  return (
    <div style={{ display: 'flex', gap: `${isHovered ? '5px' : '10px'}`, flexDirection: 'row', alignItems: 'center' }} data-test-id={`${testId}-settingtag`}>
      <Tag label={label} color={currentColor} editable={true} onChange={onChange} testId={`${testId}-settingtag`}/>
      {!isHovered ? (
        <div
          className={styles.circle}
          onMouseEnter={() => setIsHovered(true)}
          style={{
            width: 10,
            height: 10,
            backgroundColor: currentColor?.startsWith('#') ? currentColor : `var(--${currentColor})`,
          }}
          data-test-id={`${testId}-settingtag-color`}
        />
      ) : (
        <ColorPicker
          mainColor={currentColor}
          recentColors={isHovered ? colorsOptions : []}
          setIsHovered={setIsHovered}
          onChange={onChange}
          onColorChange={setCurrentColor}
          testId={`${testId}-settingtag`}
        />
      )}
    </div>
  );
};
