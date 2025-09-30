import type { NextApiRequest, NextApiResponse } from 'next';

// This is a temporary in-memory data store. 
// In a real application, you would use a database.
const negotiations = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'GET') {
        if (id) {
            const negotiation = negotiations.find(n => n.id === id);
            return negotiation
                ? res.status(200).json({ negotiation })
                : res.status(404).json({ message: `Negotiation not found.` });
        } else {
            return res.status(200).json({ negotiations });
        }
    } 
    
    else if (req.method === 'POST') {
        const { beatId, offer, message, buyerId, producerId } = req.body;

        if (!beatId || !offer || !buyerId || !producerId) {
            return res.status(400).json({ message: 'Missing required fields.' });
        }

        const newNegotiation = {
            id: `neg_${Date.now()}`,
            beatId,
            buyerId,
            producerId,
            offerPrice: parseFloat(offer),
            status: 'pending',
            createdAt: new Date().toISOString(),
            history: [{
                sender: buyerId,
                text: message || `Initial offer: $${parseFloat(offer).toFixed(2)}`,
                timestamp: new Date().toISOString(),
            }]
        };

        negotiations.push(newNegotiation);
        console.log('New Negotiation:', newNegotiation);
        return res.status(201).json({ message: 'Negotiation submitted successfully!', negotiation: newNegotiation });
    } 
    
    else if (req.method === 'PUT') {
        const { status, offer, message, sender } = req.body;
        const negotiationIndex = negotiations.findIndex(n => n.id === id);

        if (negotiationIndex === -1) {
            return res.status(404).json({ message: `Negotiation not found.` });
        }

        const negotiation = negotiations[negotiationIndex];

        if (status) {
            negotiation.status = status;
        }

        if (offer) { // This indicates a counter-offer
            negotiation.offerPrice = parseFloat(offer);
            negotiation.status = 'countered';
        }
        
        if (message) {
            negotiation.history.push({
                sender: sender || 'system',
                text: message,
                timestamp: new Date().toISOString(),
            });
        }
        
        console.log('Updated Negotiation:', negotiation);
        return res.status(200).json({ message: 'Negotiation updated.', negotiation });
    } 
    
    else {
        res.setHeader('Allow', ['GET', 'POST', 'PUT']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
