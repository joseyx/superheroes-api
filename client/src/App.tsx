import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from '@mui/material';
import { Superhero } from './interfaces/superheroes.interface';
import {
  createSuperhero,
  deleteSuperhero,
  getSuperheroes,
} from './api/superheroApi';

function App() {
  const [openModal, setOpenModal] = useState(false);
  const [heroName, setHeroName] = useState('');
  const [heroPower, setHeroPower] = useState('');
  const [humilityScore, setHumilityScore] = useState(0);
  const [superheroes, setSuperheroes] = useState<Superhero[]>([]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setHeroName('');
    setHeroPower('');
    setHumilityScore(0);
  };

  // Fetch superheroes on component mount
  useEffect(() => {
    const fetchHeroes = async () => {
      try {
        const heroes = await getSuperheroes();
        setSuperheroes(heroes);
      } catch (error) {
        console.error('Error fetching superheroes', error);
      }
    };
    fetchHeroes();
  }, []);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      heroName.trim() === '' ||
      heroPower.trim() === '' ||
      humilityScore < 1
    ) {
      return;
    }
    try {
      const newHero = await createSuperhero({
        name: heroName,
        power: heroPower,
        humilityScore,
      });
      setSuperheroes([...superheroes, newHero]);
      handleCloseModal();
    } catch (error) {
      console.error('Error creating superhero', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSuperhero(id);
      setSuperheroes(superheroes.filter((hero) => hero.id !== id));
    } catch (error) {
      console.error('Error deleting superhero', error);
    }
  };

  return (
    <>
      <div
        className="flex items-center justify-center h-screen"
        style={{ flexDirection: 'column' }}
      >
        {/* Add a button to trigger the modal */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
          style={{ marginBottom: 16 }}
        >
          Create Superhero
        </Button>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: '#BEBEBE' }}>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">Power</TableCell>
                  <TableCell align="right">Humility Score (1-10)</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {superheroes.map((row, index) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {index + 1}
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.power}</TableCell>
                    <TableCell align="right">{row.humilityScore}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        onClick={() => handleDelete(row.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      {/* Modal with form to create a superhero */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle sx={{ textAlign: 'center' }}>Create Superhero</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            id="create-superhero-form"
            onSubmit={handleSubmitForm}
            sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              autoFocus
              margin="dense"
              label="Superhero Name"
              type="text"
              value={heroName}
              onChange={(e) => setHeroName(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Superhero Power"
              type="text"
              value={heroPower}
              onChange={(e) => setHeroPower(e.target.value)}
              fullWidth
            />
            <TextField
              margin="dense"
              label="Humility Score (1-10)"
              type="number"
              value={humilityScore}
              onChange={(e) => setHumilityScore(Number(e.target.value))}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button
            type="submit"
            form="create-superhero-form"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default App;
