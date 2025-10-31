import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  Collapse,
  LinearProgress,
  Alert,
  Stack,
} from '@mui/material';
import CryptoJS from 'crypto-js';

export const DemoPage: React.FC = () => {
  const [secretKey, setSecretKey] = useState('');
  const [input, setInput] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEncrypted, setShowEncrypted] = useState(true);
  const [showAESExplanation, setShowAESExplanation] = useState(false);
  const [showKeyExplanation, setShowKeyExplanation] = useState(false);

  const handleEncrypt = () => {
    setLoading(true);
    setTimeout(() => {
      const ciphertext = CryptoJS.AES.encrypt(input, secretKey).toString();
      setEncrypted(ciphertext);
      setDecrypted('');
      setLoading(false);
    }, 1000);
  };

  const handleDecrypt = () => {
    setLoading(true);
    setTimeout(() => {
      try {
        const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        setDecrypted(originalText || '⚠️ palabra incorrecta o texto inválido');
      } catch {
        setDecrypted('⚠️ Error al descifrar');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Simulador de Cifrado
      </Typography>

      <Typography variant="body2" color="text.secondary" gutterBottom>
        En VaultCrypt, vos elegís tu palabra secreta al registrarte. Esa palabra se usa para cifrar tu información de forma segura.
      </Typography>

      <TextField
        fullWidth
        label="Tu palabra secreta"
        variant="outlined"
        value={secretKey}
        onChange={(e) => setSecretKey(e.target.value)}
        sx={{ mb: 2 }}
        type="password"
      />

      <TextField
        fullWidth
        label="Texto a cifrar"
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleEncrypt}
          disabled={!input || !secretKey || loading}
        >
          Cifrar
        </Button>
        <Button
          variant="outlined"
          onClick={handleDecrypt}
          disabled={!encrypted || !secretKey || loading}
        >
          Descifrar
        </Button>
      </Stack>

      <FormControlLabel
        control={
          <Switch
            checked={showEncrypted}
            onChange={() => setShowEncrypted(!showEncrypted)}
            disabled={!encrypted}
          />
        }
        label="Mostrar texto cifrado"
      />

      {loading && <LinearProgress sx={{ mt: 2 }} />}

      {!loading && encrypted && (
        <Paper elevation={3} sx={{ mt: 3, p: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">
            Resultado:
          </Typography>
          <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
            {showEncrypted ? encrypted : input}
          </Typography>
        </Paper>
      )}

      {!loading && decrypted && (
        <Paper elevation={3} sx={{ mt: 2, p: 2, bgcolor: '#1e1e1e' }}>
          <Typography variant="subtitle2" color="text.secondary">
            Texto descifrado:
          </Typography>
          <Typography variant="body2">{decrypted}</Typography>
        </Paper>
      )}

      <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
        <Button variant="text" onClick={() => setShowAESExplanation(!showAESExplanation)}>
          ¿Qué es el cifrado AES?
        </Button>
        <Button variant="text" onClick={() => setShowKeyExplanation(!showKeyExplanation)}>
          ¿Por qué una palabra secreta?
        </Button>
      </Stack>

      <Collapse in={showAESExplanation}>
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            <strong>AES (Advanced Encryption Standard)</strong> es un método de cifrado moderno que protege tu información transformándola en un código ilegible para cualquiera que no tenga la palabra correcta. Es el estándar global utilizado por gobiernos, bancos y apps como WhatsApp para mantener tus datos seguros.
            <br />
            Funciona dividiendo tu información en bloques y aplicando múltiples rondas de transformación matemática, lo que hace prácticamente imposible descifrarla sin la palabra.
          </Typography>
        </Alert>
      </Collapse>

      <Collapse in={showKeyExplanation}>
        <Alert severity="info" sx={{ mt: 2 }}>
          <Typography variant="body2">
            En VaultCrypt, la palabra secreta es elegida por vos al momento de registrarte. Esta palabra nunca se guarda en texto plano y se usa como base para cifrar y descifrar tu información. 
            <br />
            Al ser personal y única, garantiza que solo vos puedas acceder a tus datos, incluso si alguien accede al sistema. Es como una llave digital que solo vos tenés.
          </Typography>
        </Alert>
      </Collapse>
    </Box>
  );
};