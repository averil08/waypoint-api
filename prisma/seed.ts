import { PrismaClient, VehicleType, RouteStatus, StopType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    // Clear existing
    await prisma.routeStop.deleteMany();
    await prisma.route.deleteMany();
    await prisma.stop.deleteMany();

    // ====== STOPS (keep existing names) ======
    const stops = await Promise.all([
        prisma.stop.create({ data: { name: "PNR (Diego Silang St.) Jeepney Terminal", latitude: 16.41223053, longitude: 120.5972886 } }),
        prisma.stop.create({ data: { name: "PNR (Victory Liner) Jeepney Terminal", latitude: 16.40558768, longitude: 120.6028083 } }),
        prisma.stop.create({ data: { name: "Claudio St", latitude: 16.41224334, longitude: 120.5967201 } }),
        prisma.stop.create({ data: { name: "Jungle Town Road", latitude: 16.40955002, longitude: 120.6030566 } }),
        prisma.stop.create({ data: { name: "Botanical Garden", latitude: 16.41514563, longitude: 120.6128857 } }),
        prisma.stop.create({ data: { name: "Maria Basa", latitude: 16.42023271, longitude: 120.6166219 } }),
        prisma.stop.create({ data: { name: "Pinget/Dreamland (Upper P. Burgos) Jeepney Terminal", latitude: 16.41768052, longitude: 120.5949633 } }),
        prisma.stop.create({ data: { name: "Dreamland & Pinget Jeepney Terminal", latitude: 16.43096709, longitude: 120.5849421 } }),
        prisma.stop.create({ data: { name: "Loakan (T. Claudio St.) Terminal", latitude: 16.41230114, longitude: 120.597017 } }),
        prisma.stop.create({ data: { name: "Camp John Hay", latitude: 16.39889817, longitude: 120.6075031 } }),
        prisma.stop.create({ data: { name: "Baguio Plaza- Loakan Via EPZA Jeepney Terminal", latitude: 16.38143194, longitude: 120.6182745 } }),
        prisma.stop.create({ data: { name: "Loakan", latitude: 16.37661911, longitude: 120.6127787 } }),
        prisma.stop.create({ data: { name: "Hillside (Diego Silang St.) Jeepney Terminal", latitude: 16.41223053, longitude: 120.5972886 } }),
        prisma.stop.create({ data: { name: "Hillside", latitude: 16.3976943, longitude: 120.6042911 } }),
        prisma.stop.create({ data: { name: "Dagsian (Diego Silang St.) Jeepney Terminal", latitude: 16.41238588, longitude: 120.5966375 } }),
        prisma.stop.create({ data: { name: "Lower Dagsian", latitude: 16.39282484, longitude: 120.6076038 } }),
        prisma.stop.create({ data: { name: "Quirino Hill (Magsaysay) Jeepney Terminal", latitude: 16.416213, longitude: 120.5961298 } }),
        prisma.stop.create({ data: { name: "Slaughterhouse (Magsaysay)", latitude: 16.42057767, longitude: 120.5931173 } }),
        prisma.stop.create({ data: { name: "Quirino Hill Jeepney Terminal", latitude: 16.4289109, longitude: 120.5919483 } }),
        prisma.stop.create({ data: { name: "Gabriela Silang (Otek St.) Jeepney Terminal", latitude: 16.41276146, longitude: 120.5943506 } }),
        prisma.stop.create({ data: { name: "Gabriela Silang Jeepney Terminal", latitude: 16.39517597, longitude: 120.6048684 } }),
        prisma.stop.create({ data: { name: "Mines View (Calderon St) Jeepney Terminal", latitude: 16.412029, longitude: 120.5971729 } }),
        prisma.stop.create({ data: { name: "Mines View - Gibraltar Jeepney Terminal", latitude: 16.42131672, longitude: 120.6247759 } }),
        prisma.stop.create({ data: { name: "Crystal Cave (Otek St) Jeepney Terminal", latitude: 16.41306696, longitude: 120.5941431 } }),
        prisma.stop.create({ data: { name: "Harisson Road SSS", latitude: 16.41091218, longitude: 120.5977042 } }),
        prisma.stop.create({ data: { name: "Baguio City National High School / UC", latitude: 16.40778994, longitude: 120.5978417 } }),
        prisma.stop.create({ data: { name: "Kalaw", latitude: 16.40627783, longitude: 120.5995385 } }),
        prisma.stop.create({ data: { name: "BGH Rotunda", latitude: 16.40255961, longitude: 120.5959964 } }),
        prisma.stop.create({ data: { name: "Campo Sioco IS (Palispis Highway)", latitude: 16.40099426, longitude: 120.5913192 } }),
        prisma.stop.create({ data: { name: "Bakakeng IS", latitude: 16.39988855, longitude: 120.589098 } }),
        prisma.stop.create({ data: { name: "Mc Doris", latitude: 16.40000925, longitude: 120.5848562 } }),
        prisma.stop.create({ data: { name: "Palispis IS", latitude: 16.39741024, longitude: 120.5825943 } }),
        prisma.stop.create({ data: { name: "Crystal Cave Elementary School", latitude: 16.39756388, longitude: 120.5750985 } }),
        prisma.stop.create({ data: { name: "Happy Hallow (Calderon St.) Jeepney Terminal", latitude: 16.41222862, longitude: 120.5970913 } }),
        prisma.stop.create({ data: { name: "Happy Hallow Turnaround Point", latitude: 16.4001688, longitude: 120.6254078 } }),
        prisma.stop.create({ data: { name: "Asin (Upper Kayang St) Jeepney Terminal", latitude: 16.41475075, longitude: 120.5931199 } }),
        prisma.stop.create({ data: { name: "Asin km 6 Jeepney Stop", latitude: 16.40896442, longitude: 120.5542772 } }),
        prisma.stop.create({ data: { name: "Bakakeng (Perfecto St.) Jeepney Terminal", latitude: 16.41274707, longitude: 120.5945443 } }),
        prisma.stop.create({ data: { name: "Bakakeng (Western Link Circumferential Rd) Jeepney terminal", latitude: 16.38132856, longitude: 120.5944847 } }),
        prisma.stop.create({ data: { name: "PMA/Kias (Perfecto St) Jeepney Terminal", latitude: 16.41285509, longitude: 120.5946009 } }),
        prisma.stop.create({ data: { name: "Panagbenga Park", latitude: 16.40381673, longitude: 120.6056085 } }),
        prisma.stop.create({ data: { name: "PMA", latitude: 16.37304817, longitude: 120.6290162 } }),
        prisma.stop.create({ data: { name: "Kias Jeepney Terminal", latitude: 16.36754814, longitude: 120.6315016 } }),
        prisma.stop.create({ data: { name: "Tam-awan - Quezon Hill Jeepney Terminal", latitude: 16.41449592, longitude: 120.593408 } }),
        prisma.stop.create({ data: { name: "Quezon Hill (Victoria Street)", latitude: 16.41459682, longitude: 120.5785728 } }),
        prisma.stop.create({ data: { name: "Quezon Hill (Mallare Street)", latitude: 16.41605345, longitude: 120.5779544 } }),
        prisma.stop.create({ data: { name: "Long long Feder Road", latitude: 16.42818572, longitude: 120.5758238 } }),
        prisma.stop.create({ data: { name: "Irisan (Shagem St) Jeepney Terminal", latitude: 16.41315852, longitude: 120.5934205 } }),
        prisma.stop.create({ data: { name: "Cypress Pt Irisan", latitude: 16.41613961, longitude: 120.5573646 } }),
        prisma.stop.create({ data: { name: "Lamtang Junction", latitude: 16.43450585, longitude: 120.5446277 } }),
        prisma.stop.create({ data: { name: "Guisad (Kayang St) Jeepney Terminal", latitude: 16.4145671, longitude: 120.5942762 } }),
        prisma.stop.create({ data: { name: "Guisad Jeepney Terminal", latitude: 16.42306737, longitude: 120.5869738 } }),
        prisma.stop.create({ data: { name: "Camp 7 (Claudio St) Jeepney Terminal", latitude: 16.41189657, longitude: 120.5965743 } }),
        prisma.stop.create({ data: { name: "Camp 7 - Baguio Plaza Jeepney Terminal", latitude: 16.38215011, longitude: 120.6056633 } }),
        prisma.stop.create({ data: { name: "Baguio Plaza - Camp 8 - San Vicente - Poliwes (Mabini St) Jeepney Terminal", latitude: 16.41267777, longitude: 120.5960083 } }),
        prisma.stop.create({ data: { name: "San Vicente Market Terminal", latitude: 16.39591875, longitude: 120.5981623 } }),
        prisma.stop.create({ data: { name: "Camp 6 (Otek St) Terminal", latitude: 16.41200922, longitude: 120.5921847 } }),
        prisma.stop.create({ data: { name: "Camp 6 Bridge Checkpoint", latitude: 16.34948965, longitude: 120.6137534 } }),
    ]);

    // ====== ROUTES ======
    const routes = await Promise.all([
        // R001
        prisma.route.create({
            data: { routeNumber: 1, routeName: "Diego Silang St. (PNR Terminal) - PNR", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R002
        prisma.route.create({
            data: { routeNumber: 2, routeName: "Pacdal - Maria Basa", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R003
        prisma.route.create({
            data: { routeNumber: 3, routeName: "Upper P Burgos St. - Pinget Road", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R004
        prisma.route.create({
            data: { routeNumber: 4, routeName: "Baguio Plaza - Loakan (Vice Versa)", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R005
        prisma.route.create({
            data: { routeNumber: 5, routeName: "Diego Silang St. (Hillside Terminal) - Hillside", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R007
        prisma.route.create({
            data: { routeNumber: 7, routeName: "Diego Silang (Dagsian Terminal) - Dagsian", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R008
        prisma.route.create({
            data: { routeNumber: 8, routeName: "Quirino Hill", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R009
        prisma.route.create({
            data: { routeNumber: 9, routeName: "Gabriela Silang Terminal (Otek St) - Gabriela Silang", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R010
        prisma.route.create({
            data: { routeNumber: 10, routeName: "Mines View Terminal (Calderon St) - Mines View (Gibraltar)", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R011
        prisma.route.create({
            data: { routeNumber: 11, routeName: "Crystal Cave Terminal (Otek St) - Crystal Cave", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R012
        prisma.route.create({
            data: { routeNumber: 12, routeName: "Happy Hallow Terminal (Calderon St)", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R013
        prisma.route.create({
            data: { routeNumber: 13, routeName: "KM6 Asin Road Terminal (Upper Kayang) - Asin km 6", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R014
        prisma.route.create({
            data: { routeNumber: 14, routeName: "Bakakeng Terminal (Perfecto St) - Bakakeng Norte", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R015
        prisma.route.create({
            data: { routeNumber: 15, routeName: "PMA/Kias Terminal (Perfecto St)", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R016
        prisma.route.create({
            data: { routeNumber: 16, routeName: "Tam-awan via Quezon Hill Terminal", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R017
        prisma.route.create({
            data: { routeNumber: 17, routeName: "Irisan Terminal (Shagem St) - Lamtang", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R018
        prisma.route.create({
            data: { routeNumber: 18, routeName: "Guisad Terminal (Kayang St) - Guisad", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R019
        prisma.route.create({
            data: { routeNumber: 19, routeName: "Camp 7 (Claudio St) Terminal - Camp 7", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R020
        prisma.route.create({
            data: { routeNumber: 20, routeName: "Baguio Plaza - Camp 8 - San Vicente - Poliwes (Mabini St) Terminal", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
        // R021
        prisma.route.create({
            data: { routeNumber: 21, routeName: "Camp 6 (Otek St) Terminal", vehicleType: VehicleType.JEEPNEY, status: RouteStatus.ACTIVE },
        }),
    ]);

    // ====== ROUTE STOPS ======

    // R001: Diego Silang St. (PNR Terminal) - PNR
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[0].id, stopId: stops[0].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[0].id, stopId: stops[1].id, sequence: 2, stopType: StopType.TERMINAL },
        ],
    });

    // R002: Pacdal - Maria Basa
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[1].id, stopId: stops[2].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[1].id, stopId: stops[3].id, sequence: 2, stopType: StopType.INTERMEDIATE },
            { routeId: routes[1].id, stopId: stops[4].id, sequence: 3, stopType: StopType.INTERMEDIATE },
            { routeId: routes[1].id, stopId: stops[5].id, sequence: 4, stopType: StopType.INTERMEDIATE },
        ],
    });

    // R003: Upper P Burgos St. - Pinget Road
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[2].id, stopId: stops[6].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[2].id, stopId: stops[7].id, sequence: 2, stopType: StopType.TERMINAL },
        ],
    });

    // R004: Baguio Plaza - Loakan (Vice Versa)
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[3].id, stopId: stops[8].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[3].id, stopId: stops[9].id, sequence: 2, stopType: StopType.INTERMEDIATE },
            { routeId: routes[3].id, stopId: stops[10].id, sequence: 3, stopType: StopType.TERMINAL },
            { routeId: routes[3].id, stopId: stops[11].id, sequence: 4, stopType: StopType.INTERMEDIATE },
        ],
    });

    // R005: Diego Silang St. (Hillside Terminal) - Hillside
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[4].id, stopId: stops[12].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[4].id, stopId: stops[13].id, sequence: 2, stopType: StopType.INTERMEDIATE },
        ],
    });

    // R007: Diego Silang (Dagsian Terminal) - Dagsian
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[5].id, stopId: stops[14].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[5].id, stopId: stops[13].id, sequence: 2, stopType: StopType.INTERMEDIATE },
            { routeId: routes[5].id, stopId: stops[15].id, sequence: 3, stopType: StopType.INTERMEDIATE },
        ],
    });

    // R008: Quirino Hill
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[6].id, stopId: stops[16].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[6].id, stopId: stops[17].id, sequence: 2, stopType: StopType.INTERMEDIATE },
            { routeId: routes[6].id, stopId: stops[18].id, sequence: 3, stopType: StopType.TERMINAL },
        ],
    });

    // R009: Gabriela Silang Terminal (Otek St) - Gabriela Silang
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[7].id, stopId: stops[19].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[7].id, stopId: stops[13].id, sequence: 2, stopType: StopType.INTERMEDIATE },
            { routeId: routes[7].id, stopId: stops[20].id, sequence: 3, stopType: StopType.TERMINAL },
        ],
    });

    // R010: Mines View Terminal (Calderon St) - Mines View (Gibraltar)
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[8].id, stopId: stops[21].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[8].id, stopId: stops[3].id, sequence: 2, stopType: StopType.INTERMEDIATE },
            { routeId: routes[8].id, stopId: stops[4].id, sequence: 3, stopType: StopType.INTERMEDIATE },
            { routeId: routes[8].id, stopId: stops[22].id, sequence: 4, stopType: StopType.TERMINAL },
        ],
    });

    // R011: Crystal Cave Terminal (Otek St) - Crystal Cave
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[9].id, stopId: stops[23].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[9].id, stopId: stops[24].id, sequence: 2, stopType: StopType.INTERMEDIATE },
            { routeId: routes[9].id, stopId: stops[25].id, sequence: 3, stopType: StopType.INTERMEDIATE },
            { routeId: routes[9].id, stopId: stops[26].id, sequence: 4, stopType: StopType.INTERMEDIATE },
            { routeId: routes[9].id, stopId: stops[27].id, sequence: 5, stopType: StopType.INTERMEDIATE },
            { routeId: routes[9].id, stopId: stops[28].id, sequence: 6, stopType: StopType.INTERMEDIATE },
            { routeId: routes[9].id, stopId: stops[29].id, sequence: 7, stopType: StopType.INTERMEDIATE },
            { routeId: routes[9].id, stopId: stops[30].id, sequence: 8, stopType: StopType.INTERMEDIATE },
            { routeId: routes[9].id, stopId: stops[31].id, sequence: 9, stopType: StopType.INTERMEDIATE },
            { routeId: routes[9].id, stopId: stops[32].id, sequence: 10, stopType: StopType.INTERMEDIATE },
        ],
    });

    // R012: Happy Hallow Terminal (Calderon St)
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[10].id, stopId: stops[33].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[10].id, stopId: stops[9].id, sequence: 2, stopType: StopType.INTERMEDIATE },
            { routeId: routes[10].id, stopId: stops[34].id, sequence: 3, stopType: StopType.INTERMEDIATE },
        ],
    });

    // R013: KM6 Asin Road Terminal (Upper Kayang) - Asin km 6
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[11].id, stopId: stops[35].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[11].id, stopId: stops[36].id, sequence: 2, stopType: StopType.INTERMEDIATE },
        ],
    });

    // R014: Bakakeng Terminal (Perfecto St) - Bakakeng Norte
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[12].id, stopId: stops[37].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[12].id, stopId: stops[38].id, sequence: 2, stopType: StopType.TERMINAL },
        ],
    });

    // R015: PMA/Kias Terminal (Perfecto St)
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[13].id, stopId: stops[39].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[13].id, stopId: stops[40].id, sequence: 2, stopType: StopType.INTERMEDIATE },
            { routeId: routes[13].id, stopId: stops[9].id, sequence: 3, stopType: StopType.INTERMEDIATE },
            { routeId: routes[13].id, stopId: stops[41].id, sequence: 4, stopType: StopType.INTERMEDIATE },
            { routeId: routes[13].id, stopId: stops[42].id, sequence: 5, stopType: StopType.TERMINAL },
        ],
    });

    // R016: Tam-awan via Quezon Hill Terminal
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[14].id, stopId: stops[43].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[14].id, stopId: stops[44].id, sequence: 2, stopType: StopType.INTERMEDIATE },
            { routeId: routes[14].id, stopId: stops[45].id, sequence: 3, stopType: StopType.INTERMEDIATE },
            { routeId: routes[14].id, stopId: stops[46].id, sequence: 4, stopType: StopType.INTERMEDIATE },
        ],
    });

    // R017: Irisan Terminal (Shagem St) - Lamtang
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[15].id, stopId: stops[47].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[15].id, stopId: stops[48].id, sequence: 2, stopType: StopType.INTERMEDIATE },
            { routeId: routes[15].id, stopId: stops[49].id, sequence: 3, stopType: StopType.INTERMEDIATE },
        ],
    });

    // R018: Guisad Terminal (Kayang St) - Guisad
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[16].id, stopId: stops[50].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[16].id, stopId: stops[51].id, sequence: 2, stopType: StopType.TERMINAL },
        ],
    });

    // R019: Camp 7 (Claudio St) Terminal - Camp 7
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[17].id, stopId: stops[52].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[17].id, stopId: stops[53].id, sequence: 2, stopType: StopType.TERMINAL },
        ],
    });

    // R020: Baguio Plaza - Camp 8 - San Vicente - Poliwes (Mabini St) Terminal
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[18].id, stopId: stops[54].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[18].id, stopId: stops[55].id, sequence: 2, stopType: StopType.TERMINAL },
        ],
    });

    // R021: Camp 6 (Otek St) Terminal
    await prisma.routeStop.createMany({
        data: [
            { routeId: routes[19].id, stopId: stops[56].id, sequence: 1, stopType: StopType.TERMINAL },
            { routeId: routes[19].id, stopId: stops[57].id, sequence: 2, stopType: StopType.INTERMEDIATE },
        ],
    });

    console.log("Seed complete! Created:");
    console.log(`  - ${stops.length} stops`);
    console.log(`  - ${routes.length} routes`);
    console.log(`  - 58 route stops`);
}

main()
    .catch((e) => { console.error(e); process.exit(1); })
    .finally(() => prisma.$disconnect());
