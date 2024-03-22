-- CreateTable
CREATE TABLE "comidas" (
    "comida_id" SERIAL NOT NULL,
    "comida_name" TEXT NOT NULL,
    "comida_description" TEXT NOT NULL,
    "comida_price" DOUBLE PRECISION NOT NULL,
    "comida_created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "comida_updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "comidas_pkey" PRIMARY KEY ("comida_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" SERIAL NOT NULL,
    "order_created_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "order_updated_at" TIMESTAMP(3) NOT NULL,
    "order_address" TEXT NOT NULL,
    "order_comment" TEXT NOT NULL,
    "order_status" TEXT NOT NULL,
    "order_total" DOUBLE PRECISION NOT NULL,
    "order_items" TEXT[],
    "user_id" INTEGER NOT NULL,
    "comida_id" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orders_user_id_key" ON "orders"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "orders_comida_id_key" ON "orders"("comida_id");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_comida_id_fkey" FOREIGN KEY ("comida_id") REFERENCES "comidas"("comida_id") ON DELETE RESTRICT ON UPDATE CASCADE;
