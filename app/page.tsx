import BarbershopItem from "@/components/barbershop-item";
import BookingItem from "@/components/booking-item";
import Header from "@/components/header";
import Search from "@/components/search";
import { db } from "@/lib/prisma";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
    // chamar prisma e pegar barbearias
    // const barbershops = await db.barbershop.findMany({});
    const session = await getServerSession(authOptions);

    const [barbershops, confirmedBookings] = await Promise.all([
        db.barbershop.findMany({}),
        session?.user
        ? db.booking.findMany({
            where: {
                userId: (session.user as any).id,
                date: {
                gte: new Date(),
                },
            },
            include: {
                service: true,
                barbershop: true,
            },
            })
        : Promise.resolve([]),
    ]);

    return (
        <div>
            <Header />

            <div className="px-5 pt-5">
                <h2 className="text-xl font-bold">Olá, Miguel!</h2>
                <p className="capitalize text-sm">
                {format(new Date(), "EEEE',' dd 'de' MMMM", {
                    locale: ptBR,
                })}
                </p>
            </div>

            <div className="px-5 mt-6">
                <Search />
            </div>

            {/* <div className="px-5 mt-6">
                <h2 className="text-xs mb-3 uppercase text-gray-400 font-bold">Agendamentos</h2>
                <BookingItem />
            </div> */}
            <div className="mt-6">
                <h2 className="pl-5 text-xs mb-3 uppercase text-gray-400 font-bold">Agendamentos</h2>

                <div className="px-5 flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {confirmedBookings.map((booking) => (
                    <BookingItem key={booking.id} booking={booking} />
                ))}
                </div>
            </div>

            <div className="mt-6">
                <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Recomendados</h2>

                <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {barbershops.map((barbershop) => (
                    <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                ))}
                </div>
            </div>

            <div className="mt-6 mb-[4.5rem]">
                <h2 className="px-5 text-xs mb-3 uppercase text-gray-400 font-bold">Populares</h2>

                <div className="flex px-5 gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                {barbershops.map((barbershop) => (
                    <BarbershopItem key={barbershop.id} barbershop={barbershop} />
                ))}
                </div>
            </div>
        </div>
      );
}
