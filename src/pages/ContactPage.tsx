import { Typography, Stack, Chip, Button, Container, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function ContactPage() {
  return (
    <Container maxWidth="md" sx={{ pt: 6 }}>
      {/* Encabezado */}
      <Typography variant="h4" gutterBottom>
        Me presento
      </Typography>

      {/* Mini bio emocional */}
      <Typography variant="body1" sx={{ mb: 3 }} fontSize={12}>
        Soy Mauricio, desarrollador front-end enfocado en React y TypeScript. Me enfoco en crear interfaces que educan, empoderan y respetan la intención del usuario. VaultCrypt nació como una necesidad y un ejercicio técnico, pero se convirtió en una forma de ofrecer opsiones seguridad con empatía.
      </Typography>

      <Divider sx={{ my: 4 }} />

      {/* Stack técnico */}
      <Typography variant="h6" gutterBottom>
        Mi stack actual
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', mb: 3, gap: 1 }}>
        <Chip label="React" />
        <Chip label="TypeScript" />
        <Chip label="Node" />
        <Chip label="MUI" />
        <Chip label="Simulación de backend" />
        <Chip label="LocalStorage / SessionStorage" />
        <Chip label="UX emocional" />
      </Stack>

      <Divider sx={{ my: 4 }} />

      {/* Redes sociales */}
      <Typography variant="h6" gutterBottom>
        Visitame en
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<GitHubIcon />}
          href="https://github.com/OsmauGon"
          target="_blank"
        >
          Mi Github
        </Button>
        <Button
          variant="outlined"
          startIcon={<LinkedInIcon />}
          href="https://www.linkedin.com/in/oscar-mauricio-gonzalez"
          target="_blank"
        >
          Mi LinkedIn
        </Button>
      </Stack>

    </Container>
  );
}