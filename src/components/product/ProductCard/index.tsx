import {
  Typography,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { HeartStraight } from '@phosphor-icons/react';
import type { IProduct } from '../../../types/product';

import character1 from '../../../assets/images/characters/character1.png';
import character2 from '../../../assets/images/characters/character2.png';
import character3 from '../../../assets/images/characters/character3.png';
import character4 from '../../../assets/images/characters/character4.png';
import character5 from '../../../assets/images/characters/character5.png';
import logoEtherenum from '../../../assets/images/svgs/icons/logos_ethereum.svg'

const characterImages = [character1, character2, character3, character4, character5];
const tierKeys = ['epic', 'common', 'rare', 'legendary', 'mythic'] as const;

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const theme = useTheme();
  const imageIndex = Math.floor((product.imageId - 1) / 4) % 5;
  const imageSrc = characterImages[imageIndex];
  const tierKey = tierKeys[imageIndex];
  const bgGradient = theme.palette.custom?.tier?.[tierKey] ?? theme.palette.primary.main;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Box
        component={motion.div}
        whileHover={{  boxShadow: '0px 0px 50px 0px #c260ff52',}}
        transition={{ duration: 0.3 }}
        sx={{
          cursor: 'pointer',
          background: theme.palette.custom?.neutral2,
          color: theme.palette.custom?.neutral5,
          borderRadius: '10px',
          p: 2,
        }}
      >
        <Box
          sx={{
            display:'flex',
            justifyContent:'space-between',
            flexDirection:'column',
            aspectRatio:'1/1',
            position: 'relative',
            borderRadius: 1,
            background: bgGradient,
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: '3px 8px',
            }}
          >
            <Box
              sx={{
                background: 'rgba(49, 59, 69, 0.5)',
                color: theme.palette.custom?.neutral5,
                fontFamily:'Inter',
                px: '12px',
                py: '4px',
                borderRadius: 1,
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
            >
              {product.category}
            </Box>
            <IconButton sx={{ color: theme.palette.custom?.neutral5 }}>
              <HeartStraight size={24} weight="fill" />
            </IconButton>
          </Box>
          <Box
            component={motion.div}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              aspectRatio:'6/5',
              width: '100%',
            }}
          >
            <img
              src={imageSrc}
              alt={product.title}
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </Box>
        </Box>

        {/* Product Info */}
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontWeight: 600, fontSize: '16px', maxWidth: '50%', whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {product.title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <img
              src={logoEtherenum}
              alt="ETH"
              style={{ width: 16, height: 16 }}
            />
            <Typography sx={{ fontWeight: 500, fontSize: '14px' }}>
              {product.price} ETH
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mt: 2,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Box sx={{ borderRadius: '100%', background: theme.palette.custom.neutral5, height: '32px', width: '32px', overflow: 'hidden' }}>
              <img
                src={product.author.avatar}
                alt="ETH"
                style={{ width: 34, height: 34 }}
              />
            </Box>

            <Typography sx={{ fontWeight: 500, fontSize: '12px' }}>
              {product.author.firstName}_{product.author.lastName}
            </Typography>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}
