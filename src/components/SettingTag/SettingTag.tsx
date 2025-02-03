import React, { useState } from 'react';

import { Tag } from '../Tag/Tag';
import ColorPicker from '../ColorPicker/ColorPicker';
import { SettingTagProps } from 'kamotive_ui';

import styles from '../Tag/Tag.module.css';

export const SettingTag: React.FC<SettingTagProps> = ({ label, color, onChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const colorsOptions = ['red', 'orange', 'yellow', 'green', 'purple', 'indigo', 'blue', 'teal', 'pink'];

  return (
    <div style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center' }}>
      <Tag label={label} color={color} />
      {!isHovered ? (
        <div
          className={styles.circle}
          onMouseEnter={() => setIsHovered(true)}
          style={{
            width: 10,
            height: 10,
            backgroundColor: color?.startsWith('#') ? color : `var(--${color})`,
          }}
        />
      ) : (
        <ColorPicker
          mainColor={color}
          onChange={onChange}
          recentColors={isHovered ? colorsOptions : []}
          setIsHovered={setIsHovered}
        />
      )}
    </div>
  );
};
