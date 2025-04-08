-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "oprosId" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Answer" (
    "id" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,
    "questionId" TEXT NOT NULL,

    CONSTRAINT "Answer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Opros" (
    "id" TEXT NOT NULL,
    "resultId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creatorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Opros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOpros" (
    "id" TEXT NOT NULL,
    "templateOprosId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserOpros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAnswer" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "userOprosId" TEXT NOT NULL,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSubAnswer" (
    "id" TEXT NOT NULL,
    "answerId" TEXT NOT NULL,
    "text" TEXT,
    "userAnswerId" TEXT NOT NULL,

    CONSTRAINT "UserSubAnswer_pkey" PRIMARY KEY ("id")
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
    "userId" TEXT NOT NULL,
    "returnOprosId" TEXT,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Opros_resultId_key" ON "Opros"("resultId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_MNT_TRANSACTION_ID_key" ON "Payment"("MNT_TRANSACTION_ID");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_oprosId_fkey" FOREIGN KEY ("oprosId") REFERENCES "Opros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answer" ADD CONSTRAINT "Answer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOpros" ADD CONSTRAINT "UserOpros_templateOprosId_fkey" FOREIGN KEY ("templateOprosId") REFERENCES "Opros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_userOprosId_fkey" FOREIGN KEY ("userOprosId") REFERENCES "UserOpros"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubAnswer" ADD CONSTRAINT "UserSubAnswer_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "Answer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSubAnswer" ADD CONSTRAINT "UserSubAnswer_userAnswerId_fkey" FOREIGN KEY ("userAnswerId") REFERENCES "UserAnswer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
