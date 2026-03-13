export class ReflectionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    // Mengambil satu data reflection terbaru (hanya 1 gambar ditampilkan)
    async getReflection() {
        return this.prisma.reflection.findFirst({
            orderBy: { uploadedAt: "desc" },
        });
    }
    async uploadReflection(data) {
        // Hapus semua reflection lama, lalu buat baru (hanya 1 gambar)
        await this.prisma.reflection.deleteMany();
        return this.prisma.reflection.create({
            data: {
                title: data.title,
                imagePath: data.imagePath,
            },
        });
    }
    async replaceReflection(data) {
        // Sama dengan upload — hapus lama, buat baru
        await this.prisma.reflection.deleteMany();
        return this.prisma.reflection.create({
            data: {
                title: data.title,
                imagePath: data.imagePath,
            },
        });
    }
    async deleteReflection(id) {
        return this.prisma.reflection.delete({
            where: { id },
        });
    }
}
