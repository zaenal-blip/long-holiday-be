import { PrismaClient } from "@prisma/client";

export class ReflectionService {
    constructor(private prisma: PrismaClient) { }

    // Mengambil satu data reflection terbaru (hanya 1 gambar ditampilkan)
    async getReflection() {
        return this.prisma.reflection.findFirst({
            orderBy: { uploadedAt: "desc" },
        });
    }

    async uploadReflection(data: { title: string; imagePath: string }) {
        // Hapus semua reflection lama, lalu buat baru (hanya 1 gambar)
        await this.prisma.reflection.deleteMany();
        return this.prisma.reflection.create({
            data: {
                title: data.title,
                imagePath: data.imagePath,
            },
        });
    }

    async replaceReflection(data: { title: string; imagePath: string }) {
        // Sama dengan upload — hapus lama, buat baru
        await this.prisma.reflection.deleteMany();
        return this.prisma.reflection.create({
            data: {
                title: data.title,
                imagePath: data.imagePath,
            },
        });
    }

    async deleteReflection(id: string) {
        return this.prisma.reflection.delete({
            where: { id },
        });
    }
}
