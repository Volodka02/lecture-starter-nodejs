import { useState, useEffect } from 'react';
import { Box, Button, Divider, Paper, Typography, Chip } from '@mui/material';
import { getFighters } from '../../services/domainRequest/fightersRequest';
import { startFight } from '../../services/domainRequest/fightRequest';
import NewFighter from '../newFighter';
import Fighter from '../fighter';

export default function Fight() {
    const [fighters, setFighters] = useState([]);
    const [fighter1, setFighter1] = useState(null);
    const [fighter2, setFighter2] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getFighters().then((data) => {
            if (data && !data.error) {
                setFighters(data);
            }
        });
    }, []);

    const onCreate = (fighter) => {
        setFighters((prev) => [...prev, fighter]);
    };

    const handleFight = async () => {
        setLoading(true);
        setResult(null);
        const data = await startFight(fighter1.id, fighter2.id);
        if (data && !data.error) {
            const winner = fighters.find((f) => f.id === data.winner);
            setResult({ winner: winner ? winner.name : 'Draw', rounds: data.log.length });
        }
        setLoading(false);
    };

    const fighter1List = fighter2 ? fighters.filter((f) => f.id !== fighter2.id) : fighters;
    const fighter2List = fighter1 ? fighters.filter((f) => f.id !== fighter1.id) : fighters;

    return (
        <Box sx={{ mt: 4 }}>
            <NewFighter onCreated={onCreate} />
            <Paper elevation={2} sx={{ width: '70%', mx: 'auto', mt: 3, display: 'flex', alignItems: 'flex-start' }}>
                <Fighter selectedFighter={fighter1} onFighterSelect={setFighter1} fightersList={fighter1List} />
                <Divider orientation="vertical" flexItem />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', px: 2, pt: 2, gap: 1 }}>
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={!fighter1 || !fighter2 || loading}
                        onClick={handleFight}
                    >
                        {loading ? 'Fighting...' : 'Start Fight'}
                    </Button>
                    {result && (
                        <Box sx={{ textAlign: 'center', mt: 1 }}>
                            <Typography variant="subtitle2" fontWeight="bold">
                                Winner: {result.winner}
                            </Typography>
                            <Chip label={`${result.rounds} rounds`} size="small" sx={{ mt: 0.5 }} />
                        </Box>
                    )}
                </Box>
                <Divider orientation="vertical" flexItem />
                <Fighter selectedFighter={fighter2} onFighterSelect={setFighter2} fightersList={fighter2List} />
            </Paper>
        </Box>
    );
}
