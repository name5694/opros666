-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "MNT_TRANSACTION_ID" TEXT NOT NULL,
    "MNT_CURRENCY_CODE" TEXT NOT NULL,
    "MNT_AMOUNT" TEXT NOT NULL,
    "MNT_TEST_MODE" TEXT NOT NULL,
    "MNT_SUBSCRIBER_ID" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "lifetime" BOOLEAN NOT NULL DEFAULT false,
    "paidUntil" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_MNT_TRANSACTION_ID_key" ON "Payment"("MNT_TRANSACTION_ID");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
