import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  if (!params.id) return NextResponse.json({ error: "Service Id Required" });

  const service = await prisma?.service.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      features: {
        select: {
          title: true,
          content: true,
        },
      },
      plans: {
        select: {
          name: true,
          description: true,
          price: true,
          duration: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  const categories = await prisma?.category.findMany();

  if (!service) return NextResponse.json({ error: "Invalid Service Id" });

  const formattedService = {
    name: service.name,
    description: service.description,
    category: service.category.name,
    features: service.features,
    plans: service.plans,
    categories,
  };

  return NextResponse.json(formattedService);
}
