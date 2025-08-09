const transitData = {
    routes: [
        {
            id: '42',
            name: 'Downtown Express',
            type: 'Bus',
            color: '#ef4444', // red-500
            description: 'A fast-track route connecting the University campus to the Downtown core and City Hall.',
            path: [
                [40.7484, -73.9857], // Empire State Building area
                [40.7527, -73.9772], // Grand Central
                [40.7580, -73.9855], // Times Square
                [40.7678, -73.9822], // Columbus Circle
                [40.7794, -73.9592], // Met Museum area
                [40.7851, -73.9790], // Back towards west side
                [40.7713, -73.9826], // Lincoln Center area
                [40.7600, -73.9890]  // Back towards Times Square
            ]
        },
        {
            id: '15',
            name: 'North Circulator',
            type: 'Bus',
            color: '#22c55e', // green-500
            description: 'Circular route servicing northern residential neighborhoods and the Maplewood Mall.',
            path: [
                [40.7128, -74.0060], // City Hall
                [40.7061, -73.9969], // DUMBO area
                [40.7145, -73.9425], // Williamsburg
                [40.7308, -73.9304], // Long Island City
                [40.7410, -73.9800], // Back towards Manhattan
                [40.7250, -74.0000]  // SoHo area
            ]
        },
        {
            id: '7A',
            name: 'Airport Flyer',
            type: 'Bus',
            color: '#f59e0b', // amber-500
            description: 'Direct connection between the Financial District and Metro International Airport.',
            path: [
                [40.7075, -74.0113], // Wall Street
                [40.6892, -74.0445], // Statue of Liberty view
                [40.6782, -73.9990], // Park Slope, Brooklyn
                [40.6602, -73.9690], // Prospect Park
                [40.6413, -73.7781]  // JFK Airport area
            ]
        },
        {
            id: 'L',
            name: 'Cross-Town Line',
            type: 'Subway',
            color: '#8b5cf6', // violet-500
            description: 'Subway line running east-west, connecting major transit hubs and commercial districts.',
            path: [
                [40.7347, -74.0075], // 14th St / 8th Ave
                [40.7359, -73.9909], // Union Square
                [40.7308, -73.9831], // 3rd Ave
                [40.7262, -73.9753], // 1st Ave
                [40.7216, -73.9542]  // Bedford Ave, Brooklyn
            ]
        }
    ],
    vehicles: [
        { id: 'B-101', routeId: '42', currentPositionIndex: 0 },
        { id: 'B-102', routeId: '42', currentPositionIndex: 4 },
        { id: 'B-201', routeId: '15', currentPositionIndex: 1 },
        { id: 'B-301', routeId: '7A', currentPositionIndex: 2 },
        { id: 'S-L01', routeId: 'L', currentPositionIndex: 0 },
        { id: 'S-L02', routeId: 'L', currentPositionIndex: 3 }
    ]
};