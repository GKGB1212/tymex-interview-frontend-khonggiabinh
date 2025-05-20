import {
  Card,
  Skeleton,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { HeartStraight } from '@phosphor-icons/react';

export default function ProductCardSkeleton() {
  const theme = useTheme();

  return (
    <motion.div
      data-testid="product-card-skeleton"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Card
        sx={{
          background: theme.palette.custom?.neutral2,
          borderRadius: '10px',
          p: 2,
        }}
      >
        {/* Image Section */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 1,
            background: theme.palette.grey[800],
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: '4px 8px',
            }}
          >
            <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: 1 }} />
            <IconButton disabled>
              <HeartStraight size={24} weight="fill" />
            </IconButton>
          </Box>
          <Skeleton variant="rectangular" height={197} />
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
          <Skeleton variant="text" width="60%" height={24} />
          <Skeleton variant="text" width="30%" height={20} />
        </Box>

        <Box
          sx={{
            mt: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Skeleton variant="circular" width={32} height={32} />
          <Skeleton variant="text" width={100} height={20} />
        </Box>
      </Card>
    </motion.div>
  );
}
