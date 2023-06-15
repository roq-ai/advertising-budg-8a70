-- CreateTable
CREATE TABLE "advertiser" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "description" VARCHAR(255),
    "image" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" UUID NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "advertiser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget_allocation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "campaign_name" VARCHAR(255) NOT NULL,
    "allocated_budget" INTEGER NOT NULL,
    "advertiser_id" UUID NOT NULL,
    "media_planner_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "budget_allocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "business_constraint" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "constraint_name" VARCHAR(255) NOT NULL,
    "constraint_value" VARCHAR(255) NOT NULL,
    "advertiser_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "business_constraint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "past_performance" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "campaign_name" VARCHAR(255) NOT NULL,
    "performance_data" VARCHAR(255) NOT NULL,
    "advertiser_id" UUID NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "past_performance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "firstName" VARCHAR(255),
    "lastName" VARCHAR(255),
    "roq_user_id" VARCHAR(255) NOT NULL,
    "tenant_id" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "advertiser" ADD CONSTRAINT "advertiser_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "budget_allocation" ADD CONSTRAINT "budget_allocation_advertiser_id_fkey" FOREIGN KEY ("advertiser_id") REFERENCES "advertiser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "budget_allocation" ADD CONSTRAINT "budget_allocation_media_planner_id_fkey" FOREIGN KEY ("media_planner_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "business_constraint" ADD CONSTRAINT "business_constraint_advertiser_id_fkey" FOREIGN KEY ("advertiser_id") REFERENCES "advertiser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "past_performance" ADD CONSTRAINT "past_performance_advertiser_id_fkey" FOREIGN KEY ("advertiser_id") REFERENCES "advertiser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

