import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

// Importa todas las imágenes
import catL from './img-sizes/catl.png';
import catM from './img-sizes/catm.png';
import catS from './img-sizes/cats.png';
import catXs from './img-sizes/catxs.png';
import catXl from './img-sizes/catxl.png';

import dogL from './img-sizes/dogl.png';
import dogM from './img-sizes/dogm.png';
import dogS from './img-sizes/dogs.png';
import dogXs from './img-sizes/dogxs.png';
import dogXl from './img-sizes/dogxl.png';

// Mapeo de imágenes por animal y tamaño
const images = {
  cat: { xs: catXs, s: catS, m: catM, l: catL, xl: catXl },
  dog: { xs: dogXs, s: dogS, m: dogM, l: dogL, xl: dogXl },
};

const sizes = [
  { key: 'xs', label: '1kg - 4kg', weight: 3, range: '1kg - 4kg' },
  { key: 's', label: '4kg - 8kg', weight: 6, range: '4kg - 8kg' },
  { key: 'm', label: '8kg - 16kg', weight: 12, range: '8kg - 16kg' },
  { key: 'l', label: '16kg - 25kg', weight: 20, range: '16kg - 25kg' },
  { key: 'xl', label: '25kg o más', weight: 25, range: '25kg o más' },
];

const ScrollContainer = styled(Box)({
  display: 'flex',
  overflowX: 'auto',
  gap: '16px',
  padding: '16px 0',
});

const PetSizeSelector = ({ animal = 'dog', weight, onWeightSelect }) => {
  const [selectedWeight, setSelectedWeight] = useState(weight || null);

  const handleSelection = (size) => {
    const { weight, range } = size;
    setSelectedWeight(weight);
    if (onWeightSelect) onWeightSelect(range);
  };

  const renderSizeOption = (size) => {
    const { key, range } = size;
    const imageSrc = images[animal]?.[key];
    const isSelected = selectedWeight && selectedWeight === size.weight;

    return (
      <Box
        key={key}
        sx={{
          textAlign: 'center',
          cursor: 'pointer',
          border: isSelected ? '2px solid #3f51b5' : '2px solid transparent',
          borderRadius: '8px',
          padding: '8px',
        }}
        onClick={() => handleSelection(size)}
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`${animal} ${key}`}
            style={{ width: '100px', height: 'auto' }}
          />
        ) : (
          <Typography variant="body2">Imagen no disponible</Typography>
        )}
        <Typography variant="body2">{range}</Typography>
      </Box>
    );
  };

  if (weight) {
    const size = sizes.find((s) => s.weight >= weight);
    return size ? renderSizeOption(size) : <Typography>No matching size found</Typography>;
  }

  return (
    <ScrollContainer>
      {sizes.map(renderSizeOption)}
    </ScrollContainer>
  );
};

export default PetSizeSelector;
