import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProjectModel = runtime.Types.Result.DefaultSelection<Prisma.$ProjectPayload>;
export type AggregateProject = {
    _count: ProjectCountAggregateOutputType | null;
    _min: ProjectMinAggregateOutputType | null;
    _max: ProjectMaxAggregateOutputType | null;
};
export type ProjectMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    title: string | null;
    description: string | null;
    techStack: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type ProjectMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    title: string | null;
    description: string | null;
    techStack: string | null;
    status: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
};
export type ProjectCountAggregateOutputType = {
    id: number;
    userId: number;
    title: number;
    description: number;
    techStack: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    deletedAt: number;
    _all: number;
};
export type ProjectMinAggregateInputType = {
    id?: true;
    userId?: true;
    title?: true;
    description?: true;
    techStack?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type ProjectMaxAggregateInputType = {
    id?: true;
    userId?: true;
    title?: true;
    description?: true;
    techStack?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
};
export type ProjectCountAggregateInputType = {
    id?: true;
    userId?: true;
    title?: true;
    description?: true;
    techStack?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    deletedAt?: true;
    _all?: true;
};
export type ProjectAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProjectCountAggregateInputType;
    _min?: ProjectMinAggregateInputType;
    _max?: ProjectMaxAggregateInputType;
};
export type GetProjectAggregateType<T extends ProjectAggregateArgs> = {
    [P in keyof T & keyof AggregateProject]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProject[P]> : Prisma.GetScalarType<T[P], AggregateProject[P]>;
};
export type ProjectGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithAggregationInput | Prisma.ProjectOrderByWithAggregationInput[];
    by: Prisma.ProjectScalarFieldEnum[] | Prisma.ProjectScalarFieldEnum;
    having?: Prisma.ProjectScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProjectCountAggregateInputType | true;
    _min?: ProjectMinAggregateInputType;
    _max?: ProjectMaxAggregateInputType;
};
export type ProjectGroupByOutputType = {
    id: string;
    userId: string;
    title: string;
    description: string | null;
    techStack: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    _count: ProjectCountAggregateOutputType | null;
    _min: ProjectMinAggregateOutputType | null;
    _max: ProjectMaxAggregateOutputType | null;
};
type GetProjectGroupByPayload<T extends ProjectGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProjectGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProjectGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProjectGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProjectGroupByOutputType[P]>;
}>>;
export type ProjectWhereInput = {
    AND?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    OR?: Prisma.ProjectWhereInput[];
    NOT?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    id?: Prisma.UuidFilter<"Project"> | string;
    userId?: Prisma.UuidFilter<"Project"> | string;
    title?: Prisma.StringFilter<"Project"> | string;
    description?: Prisma.StringNullableFilter<"Project"> | string | null;
    techStack?: Prisma.StringNullableFilter<"Project"> | string | null;
    status?: Prisma.StringFilter<"Project"> | string;
    createdAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Project"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    worklogs?: Prisma.WorklogListRelationFilter;
};
export type ProjectOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    techStack?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    worklogs?: Prisma.WorklogOrderByRelationAggregateInput;
};
export type ProjectWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    OR?: Prisma.ProjectWhereInput[];
    NOT?: Prisma.ProjectWhereInput | Prisma.ProjectWhereInput[];
    userId?: Prisma.UuidFilter<"Project"> | string;
    title?: Prisma.StringFilter<"Project"> | string;
    description?: Prisma.StringNullableFilter<"Project"> | string | null;
    techStack?: Prisma.StringNullableFilter<"Project"> | string | null;
    status?: Prisma.StringFilter<"Project"> | string;
    createdAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Project"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    worklogs?: Prisma.WorklogListRelationFilter;
}, "id">;
export type ProjectOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    techStack?: Prisma.SortOrderInput | Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.ProjectCountOrderByAggregateInput;
    _max?: Prisma.ProjectMaxOrderByAggregateInput;
    _min?: Prisma.ProjectMinOrderByAggregateInput;
};
export type ProjectScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProjectScalarWhereWithAggregatesInput | Prisma.ProjectScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProjectScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProjectScalarWhereWithAggregatesInput | Prisma.ProjectScalarWhereWithAggregatesInput[];
    id?: Prisma.UuidWithAggregatesFilter<"Project"> | string;
    userId?: Prisma.UuidWithAggregatesFilter<"Project"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Project"> | string | null;
    techStack?: Prisma.StringNullableWithAggregatesFilter<"Project"> | string | null;
    status?: Prisma.StringWithAggregatesFilter<"Project"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Project"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Project"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Project"> | Date | string | null;
};
export type ProjectCreateInput = {
    id?: string;
    title: string;
    description?: string | null;
    techStack?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutProjectsInput;
    worklogs?: Prisma.WorklogCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateInput = {
    id?: string;
    userId: string;
    title: string;
    description?: string | null;
    techStack?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    worklogs?: Prisma.WorklogUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    techStack?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutProjectsNestedInput;
    worklogs?: Prisma.WorklogUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    techStack?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    worklogs?: Prisma.WorklogUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectCreateManyInput = {
    id?: string;
    userId: string;
    title: string;
    description?: string | null;
    techStack?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type ProjectUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    techStack?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProjectUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    techStack?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProjectListRelationFilter = {
    every?: Prisma.ProjectWhereInput;
    some?: Prisma.ProjectWhereInput;
    none?: Prisma.ProjectWhereInput;
};
export type ProjectOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ProjectCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    techStack?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type ProjectMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    techStack?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type ProjectMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    techStack?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    deletedAt?: Prisma.SortOrder;
};
export type ProjectScalarRelationFilter = {
    is?: Prisma.ProjectWhereInput;
    isNot?: Prisma.ProjectWhereInput;
};
export type ProjectCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutUserInput, Prisma.ProjectUncheckedCreateWithoutUserInput> | Prisma.ProjectCreateWithoutUserInput[] | Prisma.ProjectUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutUserInput | Prisma.ProjectCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProjectCreateManyUserInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutUserInput, Prisma.ProjectUncheckedCreateWithoutUserInput> | Prisma.ProjectCreateWithoutUserInput[] | Prisma.ProjectUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutUserInput | Prisma.ProjectCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.ProjectCreateManyUserInputEnvelope;
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
};
export type ProjectUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutUserInput, Prisma.ProjectUncheckedCreateWithoutUserInput> | Prisma.ProjectCreateWithoutUserInput[] | Prisma.ProjectUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutUserInput | Prisma.ProjectCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutUserInput | Prisma.ProjectUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProjectCreateManyUserInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutUserInput | Prisma.ProjectUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutUserInput | Prisma.ProjectUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type ProjectUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutUserInput, Prisma.ProjectUncheckedCreateWithoutUserInput> | Prisma.ProjectCreateWithoutUserInput[] | Prisma.ProjectUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutUserInput | Prisma.ProjectCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.ProjectUpsertWithWhereUniqueWithoutUserInput | Prisma.ProjectUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.ProjectCreateManyUserInputEnvelope;
    set?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    disconnect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    delete?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    connect?: Prisma.ProjectWhereUniqueInput | Prisma.ProjectWhereUniqueInput[];
    update?: Prisma.ProjectUpdateWithWhereUniqueWithoutUserInput | Prisma.ProjectUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.ProjectUpdateManyWithWhereWithoutUserInput | Prisma.ProjectUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type ProjectCreateNestedOneWithoutWorklogsInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutWorklogsInput, Prisma.ProjectUncheckedCreateWithoutWorklogsInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutWorklogsInput;
    connect?: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateOneRequiredWithoutWorklogsNestedInput = {
    create?: Prisma.XOR<Prisma.ProjectCreateWithoutWorklogsInput, Prisma.ProjectUncheckedCreateWithoutWorklogsInput>;
    connectOrCreate?: Prisma.ProjectCreateOrConnectWithoutWorklogsInput;
    upsert?: Prisma.ProjectUpsertWithoutWorklogsInput;
    connect?: Prisma.ProjectWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProjectUpdateToOneWithWhereWithoutWorklogsInput, Prisma.ProjectUpdateWithoutWorklogsInput>, Prisma.ProjectUncheckedUpdateWithoutWorklogsInput>;
};
export type ProjectCreateWithoutUserInput = {
    id?: string;
    title: string;
    description?: string | null;
    techStack?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    worklogs?: Prisma.WorklogCreateNestedManyWithoutProjectInput;
};
export type ProjectUncheckedCreateWithoutUserInput = {
    id?: string;
    title: string;
    description?: string | null;
    techStack?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    worklogs?: Prisma.WorklogUncheckedCreateNestedManyWithoutProjectInput;
};
export type ProjectCreateOrConnectWithoutUserInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutUserInput, Prisma.ProjectUncheckedCreateWithoutUserInput>;
};
export type ProjectCreateManyUserInputEnvelope = {
    data: Prisma.ProjectCreateManyUserInput | Prisma.ProjectCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type ProjectUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProjectWhereUniqueInput;
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutUserInput, Prisma.ProjectUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutUserInput, Prisma.ProjectUncheckedCreateWithoutUserInput>;
};
export type ProjectUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutUserInput, Prisma.ProjectUncheckedUpdateWithoutUserInput>;
};
export type ProjectUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.ProjectScalarWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyWithoutUserInput>;
};
export type ProjectScalarWhereInput = {
    AND?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
    OR?: Prisma.ProjectScalarWhereInput[];
    NOT?: Prisma.ProjectScalarWhereInput | Prisma.ProjectScalarWhereInput[];
    id?: Prisma.UuidFilter<"Project"> | string;
    userId?: Prisma.UuidFilter<"Project"> | string;
    title?: Prisma.StringFilter<"Project"> | string;
    description?: Prisma.StringNullableFilter<"Project"> | string | null;
    techStack?: Prisma.StringNullableFilter<"Project"> | string | null;
    status?: Prisma.StringFilter<"Project"> | string;
    createdAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Project"> | Date | string;
    deletedAt?: Prisma.DateTimeNullableFilter<"Project"> | Date | string | null;
};
export type ProjectCreateWithoutWorklogsInput = {
    id?: string;
    title: string;
    description?: string | null;
    techStack?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutProjectsInput;
};
export type ProjectUncheckedCreateWithoutWorklogsInput = {
    id?: string;
    userId: string;
    title: string;
    description?: string | null;
    techStack?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type ProjectCreateOrConnectWithoutWorklogsInput = {
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutWorklogsInput, Prisma.ProjectUncheckedCreateWithoutWorklogsInput>;
};
export type ProjectUpsertWithoutWorklogsInput = {
    update: Prisma.XOR<Prisma.ProjectUpdateWithoutWorklogsInput, Prisma.ProjectUncheckedUpdateWithoutWorklogsInput>;
    create: Prisma.XOR<Prisma.ProjectCreateWithoutWorklogsInput, Prisma.ProjectUncheckedCreateWithoutWorklogsInput>;
    where?: Prisma.ProjectWhereInput;
};
export type ProjectUpdateToOneWithWhereWithoutWorklogsInput = {
    where?: Prisma.ProjectWhereInput;
    data: Prisma.XOR<Prisma.ProjectUpdateWithoutWorklogsInput, Prisma.ProjectUncheckedUpdateWithoutWorklogsInput>;
};
export type ProjectUpdateWithoutWorklogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    techStack?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutProjectsNestedInput;
};
export type ProjectUncheckedUpdateWithoutWorklogsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    techStack?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProjectCreateManyUserInput = {
    id?: string;
    title: string;
    description?: string | null;
    techStack?: string | null;
    status?: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    deletedAt?: Date | string | null;
};
export type ProjectUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    techStack?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    worklogs?: Prisma.WorklogUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    techStack?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    worklogs?: Prisma.WorklogUncheckedUpdateManyWithoutProjectNestedInput;
};
export type ProjectUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    techStack?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    status?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    deletedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type ProjectCountOutputType = {
    worklogs: number;
};
export type ProjectCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    worklogs?: boolean | ProjectCountOutputTypeCountWorklogsArgs;
};
export type ProjectCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectCountOutputTypeSelect<ExtArgs> | null;
};
export type ProjectCountOutputTypeCountWorklogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorklogWhereInput;
};
export type ProjectSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    title?: boolean;
    description?: boolean;
    techStack?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    worklogs?: boolean | Prisma.Project$worklogsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProjectCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["project"]>;
export type ProjectSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    title?: boolean;
    description?: boolean;
    techStack?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["project"]>;
export type ProjectSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    title?: boolean;
    description?: boolean;
    techStack?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["project"]>;
export type ProjectSelectScalar = {
    id?: boolean;
    userId?: boolean;
    title?: boolean;
    description?: boolean;
    techStack?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    deletedAt?: boolean;
};
export type ProjectOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "title" | "description" | "techStack" | "status" | "createdAt" | "updatedAt" | "deletedAt", ExtArgs["result"]["project"]>;
export type ProjectInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    worklogs?: boolean | Prisma.Project$worklogsArgs<ExtArgs>;
    _count?: boolean | Prisma.ProjectCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProjectIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ProjectIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ProjectPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Project";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        worklogs: Prisma.$WorklogPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        title: string;
        description: string | null;
        techStack: string | null;
        status: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt: Date | null;
    }, ExtArgs["result"]["project"]>;
    composites: {};
};
export type ProjectGetPayload<S extends boolean | null | undefined | ProjectDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProjectPayload, S>;
export type ProjectCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProjectFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProjectCountAggregateInputType | true;
};
export interface ProjectDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Project'];
        meta: {
            name: 'Project';
        };
    };
    findUnique<T extends ProjectFindUniqueArgs>(args: Prisma.SelectSubset<T, ProjectFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProjectFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProjectFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProjectFindFirstArgs>(args?: Prisma.SelectSubset<T, ProjectFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProjectFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProjectFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProjectFindManyArgs>(args?: Prisma.SelectSubset<T, ProjectFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProjectCreateArgs>(args: Prisma.SelectSubset<T, ProjectCreateArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProjectCreateManyArgs>(args?: Prisma.SelectSubset<T, ProjectCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProjectCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProjectCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProjectDeleteArgs>(args: Prisma.SelectSubset<T, ProjectDeleteArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProjectUpdateArgs>(args: Prisma.SelectSubset<T, ProjectUpdateArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProjectDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProjectDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProjectUpdateManyArgs>(args: Prisma.SelectSubset<T, ProjectUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProjectUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProjectUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProjectUpsertArgs>(args: Prisma.SelectSubset<T, ProjectUpsertArgs<ExtArgs>>): Prisma.Prisma__ProjectClient<runtime.Types.Result.GetResult<Prisma.$ProjectPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProjectCountArgs>(args?: Prisma.Subset<T, ProjectCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProjectCountAggregateOutputType> : number>;
    aggregate<T extends ProjectAggregateArgs>(args: Prisma.Subset<T, ProjectAggregateArgs>): Prisma.PrismaPromise<GetProjectAggregateType<T>>;
    groupBy<T extends ProjectGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProjectGroupByArgs['orderBy'];
    } : {
        orderBy?: ProjectGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProjectGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProjectGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProjectFieldRefs;
}
export interface Prisma__ProjectClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    worklogs<T extends Prisma.Project$worklogsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Project$worklogsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorklogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProjectFieldRefs {
    readonly id: Prisma.FieldRef<"Project", 'String'>;
    readonly userId: Prisma.FieldRef<"Project", 'String'>;
    readonly title: Prisma.FieldRef<"Project", 'String'>;
    readonly description: Prisma.FieldRef<"Project", 'String'>;
    readonly techStack: Prisma.FieldRef<"Project", 'String'>;
    readonly status: Prisma.FieldRef<"Project", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Project", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Project", 'DateTime'>;
    readonly deletedAt: Prisma.FieldRef<"Project", 'DateTime'>;
}
export type ProjectFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
export type ProjectFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
export type ProjectFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.ProjectOrderByWithRelationInput | Prisma.ProjectOrderByWithRelationInput[];
    cursor?: Prisma.ProjectWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProjectScalarFieldEnum | Prisma.ProjectScalarFieldEnum[];
};
export type ProjectCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectCreateInput, Prisma.ProjectUncheckedCreateInput>;
};
export type ProjectCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProjectCreateManyInput | Prisma.ProjectCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProjectCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    data: Prisma.ProjectCreateManyInput | Prisma.ProjectCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ProjectIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ProjectUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectUpdateInput, Prisma.ProjectUncheckedUpdateInput>;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyInput>;
    where?: Prisma.ProjectWhereInput;
    limit?: number;
};
export type ProjectUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProjectUpdateManyMutationInput, Prisma.ProjectUncheckedUpdateManyInput>;
    where?: Prisma.ProjectWhereInput;
    limit?: number;
    include?: Prisma.ProjectIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ProjectUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProjectCreateInput, Prisma.ProjectUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProjectUpdateInput, Prisma.ProjectUncheckedUpdateInput>;
};
export type ProjectDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
    where: Prisma.ProjectWhereUniqueInput;
};
export type ProjectDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProjectWhereInput;
    limit?: number;
};
export type Project$worklogsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WorklogSelect<ExtArgs> | null;
    omit?: Prisma.WorklogOmit<ExtArgs> | null;
    include?: Prisma.WorklogInclude<ExtArgs> | null;
    where?: Prisma.WorklogWhereInput;
    orderBy?: Prisma.WorklogOrderByWithRelationInput | Prisma.WorklogOrderByWithRelationInput[];
    cursor?: Prisma.WorklogWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorklogScalarFieldEnum | Prisma.WorklogScalarFieldEnum[];
};
export type ProjectDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProjectSelect<ExtArgs> | null;
    omit?: Prisma.ProjectOmit<ExtArgs> | null;
    include?: Prisma.ProjectInclude<ExtArgs> | null;
};
export {};
