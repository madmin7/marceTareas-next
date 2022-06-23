


interface SeedData {
    entries: SeedEntry[];
}



interface SeedEntry {
    description: string,
    status: string,
    createdAt: number,
}



export const seedData: SeedData = {

    entries: [
        {
            description: 'Pendientes: Lorem ipsum, dolor sit amet consectetur adipisicing elit.',
            status: 'pending',
            createdAt: Date.now(),
        },
        {
            description: 'In-Progress: Lorem ipsum, la concha bien de la lora .',
            status: 'in-progress',
            createdAt: Date.now()-100000,
        },
        {
            description: 'Finished: Lorem eeeeeeesupercalifragiliticuestialidoso aun que al oir decirlo suena enredoso.',
            status: 'finished',
            createdAt: Date.now()-10000,
        },
    ]
}