USE [CarPortal]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 12/04/2022 4:30:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarImage]    Script Date: 12/04/2022 4:30:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarImage](
	[ImageID] [int] IDENTITY(1,1) NOT NULL,
	[CarID] [int] NOT NULL,
	[ImageName] [nvarchar](250) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[CarInformation]    Script Date: 12/04/2022 4:30:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CarInformation](
	[CarID] [int] IDENTITY(1,1) NOT NULL,
	[Make] [varchar](100) NULL,
	[Model] [varchar](100) NULL,
	[YearOFManufacture] [int] NULL,
	[Color] [varchar](100) NULL,
	[CarType] [varchar](50) NULL,
	[Extras] [varchar](100) NULL,
	[PublishStatus] [varchar](50) NULL,
	[Price] [decimal](10, 2) NULL,
	[AddedBy] [varchar](100) NULL,
	[DateAdded] [datetime] NULL,
	[UpdateBy] [varchar](100) NULL,
	[DateUpdate] [datetime] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 12/04/2022 4:30:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[CustomerID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](100) NULL,
	[Email] [varchar](100) NULL,
	[PhoneNumber] [varchar](100) NULL,
	[AddedBy] [varchar](100) NULL,
	[DateAdded] [datetime] NULL,
	[UpdateBy] [varchar](100) NULL,
	[DateUpdate] [datetime] NULL,
	[CarID] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[CustomerID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Transcation]    Script Date: 12/04/2022 4:30:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Transcation](
	[CarID] [int] IDENTITY(1,1) NOT NULL,
	[QryOption] [int] NOT NULL,
	[Make] [nvarchar](100) NOT NULL,
	[Model] [nvarchar](100) NOT NULL,
	[YearOFManufacture] [nvarchar](100) NOT NULL,
	[Color] [nvarchar](100) NOT NULL,
	[CarType] [nvarchar](100) NOT NULL,
	[Extras] [nvarchar](max) NOT NULL,
	[PublishStatus] [bit] NOT NULL,
	[Price] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_Transcation] PRIMARY KEY CLUSTERED 
(
	[CarID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20220410230430_Initial Create', N'6.0.3')
GO
SET IDENTITY_INSERT [dbo].[CarImage] ON 

INSERT [dbo].[CarImage] ([ImageID], [CarID], [ImageName]) VALUES (1, 1, N'1_b4ab2b9b-5063-40d4-9d22-46ac76ce49c3.jpg')
INSERT [dbo].[CarImage] ([ImageID], [CarID], [ImageName]) VALUES (2, 1, N'1_2239bb3e-b652-4c45-9c81-ddd4e592f6c8.jpeg')
INSERT [dbo].[CarImage] ([ImageID], [CarID], [ImageName]) VALUES (3, 2, N'2_736bd50c-e882-4026-9c59-7f10a00a95db.jpg')
INSERT [dbo].[CarImage] ([ImageID], [CarID], [ImageName]) VALUES (4, 2, N'2_8a567637-ea27-46ff-a041-0b14b0741987.jpeg')
INSERT [dbo].[CarImage] ([ImageID], [CarID], [ImageName]) VALUES (5, 2, N'2_9b98bda5-b864-4bcc-a759-04ef10fe5cd8.jpg')
INSERT [dbo].[CarImage] ([ImageID], [CarID], [ImageName]) VALUES (6, 3, N'3_c985ebf0-91f0-4d18-8aec-986b8be46892.jpeg')
INSERT [dbo].[CarImage] ([ImageID], [CarID], [ImageName]) VALUES (7, 3, N'3_47d2c204-95a3-4497-9581-2408053422f1.jpg')
INSERT [dbo].[CarImage] ([ImageID], [CarID], [ImageName]) VALUES (8, 3, N'3_2ed2dad5-e051-4f43-be7f-4ba85d3dc79a.jpeg')
INSERT [dbo].[CarImage] ([ImageID], [CarID], [ImageName]) VALUES (9, 4, N'4_f3b8818d-d0a8-4409-8842-58fda518e8a8.jpg')
INSERT [dbo].[CarImage] ([ImageID], [CarID], [ImageName]) VALUES (10, 4, N'4_bc8663ff-b33b-4ffc-b6ce-43fdcc28da33.jpeg')
INSERT [dbo].[CarImage] ([ImageID], [CarID], [ImageName]) VALUES (11, 5, N'5_f3fa65d1-87ca-4328-80e4-65757ac207bf.jpg')
INSERT [dbo].[CarImage] ([ImageID], [CarID], [ImageName]) VALUES (12, 5, N'5_dade2781-fa39-4ada-89aa-0da7325bdadd.jpeg')
SET IDENTITY_INSERT [dbo].[CarImage] OFF
GO
SET IDENTITY_INSERT [dbo].[CarInformation] ON 

INSERT [dbo].[CarInformation] ([CarID], [Make], [Model], [YearOFManufacture], [Color], [CarType], [Extras], [PublishStatus], [Price], [AddedBy], [DateAdded], [UpdateBy], [DateUpdate]) VALUES (1, N'Toyota', N'Axio', 2015, N'Red', N'New', N'Tobar', N'Publish', CAST(230000.00 AS Decimal(10, 2)), NULL, CAST(N'2022-04-12T15:49:37.133' AS DateTime), NULL, NULL)
INSERT [dbo].[CarInformation] ([CarID], [Make], [Model], [YearOFManufacture], [Color], [CarType], [Extras], [PublishStatus], [Price], [AddedBy], [DateAdded], [UpdateBy], [DateUpdate]) VALUES (2, N'Allion', N'F', 2015, N'Silver', N'Second Hand', N'roof', N'Publish', CAST(1500000.00 AS Decimal(10, 2)), NULL, CAST(N'2022-04-12T15:51:59.673' AS DateTime), NULL, NULL)
INSERT [dbo].[CarInformation] ([CarID], [Make], [Model], [YearOFManufacture], [Color], [CarType], [Extras], [PublishStatus], [Price], [AddedBy], [DateAdded], [UpdateBy], [DateUpdate]) VALUES (3, N'Audi', N'G Flex', 2016, N'Blue', N'New', N'Sound ', N'Publish', CAST(360000.00 AS Decimal(10, 2)), NULL, CAST(N'2022-04-12T16:17:44.800' AS DateTime), NULL, NULL)
INSERT [dbo].[CarInformation] ([CarID], [Make], [Model], [YearOFManufacture], [Color], [CarType], [Extras], [PublishStatus], [Price], [AddedBy], [DateAdded], [UpdateBy], [DateUpdate]) VALUES (4, N'BMW', N'G8i', 2022, N'White', N'New', N'NA', N'Publish', CAST(230000.00 AS Decimal(10, 2)), NULL, CAST(N'2022-04-12T16:18:52.043' AS DateTime), NULL, NULL)
INSERT [dbo].[CarInformation] ([CarID], [Make], [Model], [YearOFManufacture], [Color], [CarType], [Extras], [PublishStatus], [Price], [AddedBy], [DateAdded], [UpdateBy], [DateUpdate]) VALUES (5, N'Allion', N'H Fush', 2010, N'Silver', N'Second Hand', N'Ac ok', N'Publish', CAST(120000.00 AS Decimal(10, 2)), NULL, CAST(N'2022-04-12T16:24:56.103' AS DateTime), NULL, NULL)
SET IDENTITY_INSERT [dbo].[CarInformation] OFF
GO
SET IDENTITY_INSERT [dbo].[Customer] ON 

INSERT [dbo].[Customer] ([CustomerID], [Name], [Email], [PhoneNumber], [AddedBy], [DateAdded], [UpdateBy], [DateUpdate], [CarID]) VALUES (1, N'MD NASIR UDDIN', N'nasiruiu@gmail.com', N'0657111877', NULL, CAST(N'2022-04-12T16:19:40.753' AS DateTime), NULL, NULL, 1)
INSERT [dbo].[Customer] ([CustomerID], [Name], [Email], [PhoneNumber], [AddedBy], [DateAdded], [UpdateBy], [DateUpdate], [CarID]) VALUES (2, N'Rahim', N'rahim@gmail.com', N'0613368063', NULL, CAST(N'2022-04-12T16:26:33.313' AS DateTime), NULL, NULL, 2)
INSERT [dbo].[Customer] ([CustomerID], [Name], [Email], [PhoneNumber], [AddedBy], [DateAdded], [UpdateBy], [DateUpdate], [CarID]) VALUES (3, N'Rasel', N'rasel@gmail.com', N'061255624', NULL, CAST(N'2022-04-12T16:27:09.110' AS DateTime), NULL, NULL, 2)
SET IDENTITY_INSERT [dbo].[Customer] OFF
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_ALLCARS]    Script Date: 12/04/2022 4:30:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[SP_GET_ALLCARS]
@QryOption INT = -1,
@CarID INT = -1,
@ImageID INT = -1,
@Make varchar(100)= '',
@Model varchar(100)= '',
@YearOFManufacture INT= -1,
@Color varchar(100)= -1,
@CarType BIT= 0,
@Extras varchar(100)= -1,
@PublishStatus BIT= 0,
@Price DECIMAL(18,2)= 0,
@ImageName NVARCHAR(MAX)=''

AS

DECLARE @SAVE_DATA INT = 1,
@UPDATE_DATA INT = 2,
@SELECT_ALL_DATA INT= 3,
@GET_EDIT_DATA INT = 4,
@DELETE_DATA INT = 5,
@SAVE_IMAGE_DATA INT = 6,
@LOAD_CAR_IMAGE_DATA INT = 7,
@DELETE_CAR_IMAGE_DATA INT = 8

IF @QryOption = @SAVE_DATA
BEGIN
	INSERT INTO CarInformation(Make,Model,YearOFManufacture,Color,CarType,Extras,PublishStatus,Price)
	VALUES(@Make,@Model,@YearOFManufacture,@Color,@CarType,@Extras,@PublishStatus,@Price)
END

ELSE IF @QryOption = @UPDATE_DATA
BEGIN
	UPDATE CarInformation SET Make=@Make,Model=@Model,YearOFManufacture=@YearOFManufacture,
	Color=@Color,CarType=@CarType,Extras=@Extras,PublishStatus=@PublishStatus,Price=@Price
	WHERE CarID = @CarID	
END
ELSE IF @QryOption = @SELECT_ALL_DATA
BEGIN
	SELECT TOP 4 c.CarID, c.Make,c.Price,e.ImageName,e.ImageID
	FROM CarInformation c 
	join (select ImageID,CarID,ImageName from [dbo].[CarImage] where ImageID in(
	select max(ImageID) from [dbo].[CarImage] group by CarID)) e on c.CarID=e.CarID 
	Order by c.DateAdded desc

END
ELSE IF @QryOption = @GET_EDIT_DATA
BEGIN
	SELECT CarID, Make,Model,YearOFManufacture,Color,CarType,Extras,PublishStatus,Price
	FROM CarInformation
	WHERE CarID = @CarID
END
ELSE IF @QryOption = @DELETE_DATA
BEGIN
	DELETE FROM CarInformation
	WHERE CarID = @CarID
END
ELSE IF @QryOption = @SAVE_IMAGE_DATA
BEGIN
	INSERT INTO CarImage(CarID,ImageName)VALUES(@CarID,@ImageName)
END
ELSE IF @QryOption = @LOAD_CAR_IMAGE_DATA
BEGIN
	SELECT ImageID,CarID,ImageName FROM CarImage
	WHERE CarID = @CarID
END
ELSE IF @QryOption = @DELETE_CAR_IMAGE_DATA
BEGIN
	DELETE FROM CarImage
	WHERE ImageID = @ImageID
END
GO
/****** Object:  StoredProcedure [dbo].[SP_GET_CAR_INFORMATION]    Script Date: 12/04/2022 4:30:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_GET_CAR_INFORMATION]
@QryOption INT = -1,
@CarID INT = -1,
@Min INT = 0,
@Max INT = 0,
@Make VARCHAR(50)=''

AS
--select * from CarInformation
DECLARE @GET_ALL_CAR INT = 1,
@GET_SELECTED_CAR_DETAILS INT = 2,
@GET_SEARCH_DATA INT = 3

IF @QryOption = @GET_ALL_CAR
BEGIN
	SELECT TOP 4 C.CarID,C.Make,C.Model,C.YearOFManufacture,C.Color,C.Price,CI.ImageName,C.Extras
	FROM CarInformation C
	LEFT JOIN(
		SELECT CarID,Max(ImageID)ImageID FROM CarImage
		GROUP BY CarID
	)x ON C.CarID = x.CarID
	LEFT JOIN CarImage CI ON CI.ImageID = x.ImageID
	WHERE C.PublishStatus='Publish'
	ORDEr BY C.CarID DESC
END
ELSE IF @QryOption = @GET_SELECTED_CAR_DETAILS
BEGIN
	SELECT C.CarID,C.Make,C.Model,C.YearOFManufacture,C.Color,C.Price,CI.ImageName,C.Extras 
	FROM CarInformation C
	LEFT JOIN CarImage CI ON CI.CarID = C.CarID
	WHERE C.CarID = @CarID
	ORDEr BY C.CarID DESC
END
ELSE IF @QryOption = @GET_SEARCH_DATA
BEGIN
	DECLARE @Qry VARCHAR(MAX)='',@WhereCond VARCHAR(MAX) = ''

	IF ISNULL(@Min,0) = 0
	BEGIN
		SET @Min = (SELECT MIN(Price) FROM CarInformation)
	END

	IF ISNULL(@Max,0) = 0
	BEGIN
		SET @Max = (SELECT MAX(Price) FROM CarInformation)
	END

	IF ISNULL(@Make,'')<>''
	BEGIN
		SET @WhereCond = 'C.Make='''+@Make+''' AND C.Price BETWEEN '+CAST(@Min As VARCHAR (50))+' AND '+CAST(@Max As VARCHAR (50))+''
	END
	ELSE
	BEGIN
		SET @WhereCond = 'C.Price BETWEEN '+CAST(@Min As VARCHAR (50))+' AND '+CAST(@Max As VARCHAR (50))+''
	END

	SET @Qry = '
			SELECT C.CarID,C.Make,C.Model,C.YearOFManufacture,C.Color,C.Price,CI.ImageName,C.Extras
			FROM CarInformation C
			LEFT JOIN(
				SELECT CarID,Max(ImageID)ImageID FROM CarImage
				GROUP BY CarID
			)x ON C.CarID = x.CarID
			LEFT JOIN CarImage CI ON CI.ImageID = x.ImageID
			WHERE '+@WhereCond+'
			ORDEr BY C.CarID DESC
	'
	EXEC(@Qry)

END
GO
/****** Object:  StoredProcedure [dbo].[SP_SET_CAR_INFORMATION]    Script Date: 12/04/2022 4:30:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SP_SET_CAR_INFORMATION]
@QryOption INT = -1,
@CarID INT = -1,
@ImageID INT = -1,
@Make varchar(100)= '',
@Model varchar(100)= '',
@YearOFManufacture INT= -1,
@Color varchar(100)= -1,
@CarType varchar(100)= '',
@Extras varchar(100)= -1,
@PublishStatus varchar(100)= '',
@Price DECIMAL(18,2)= 0,
@ImageName NVARCHAR(MAX)=''

AS

DECLARE @SAVE_DATA INT = 1,
@UPDATE_DATA INT = 2,
@SELECT_ALL_DATA INT= 3,
@GET_EDIT_DATA INT = 4,
@DELETE_DATA INT = 5,
@SAVE_IMAGE_DATA INT = 6,
@LOAD_CAR_IMAGE_DATA INT = 7,
@DELETE_CAR_IMAGE_DATA INT = 8,
@SELECT_ALL_DATA_INTERESTED_PERSON INT=9

IF @QryOption = @SAVE_DATA
BEGIN
	INSERT INTO CarInformation(Make,Model,YearOFManufacture,Color,CarType,Extras,PublishStatus,Price,DateAdded)
	VALUES(@Make,@Model,@YearOFManufacture,@Color,@CarType,@Extras,@PublishStatus,@Price,GETDATE())
END

ELSE IF @QryOption = @UPDATE_DATA
BEGIN
	UPDATE CarInformation SET Make=@Make,Model=@Model,YearOFManufacture=@YearOFManufacture,
	Color=@Color,CarType=@CarType,Extras=@Extras,PublishStatus=@PublishStatus,Price=@Price
	WHERE CarID = @CarID	
END
ELSE IF @QryOption = @SELECT_ALL_DATA
BEGIN
	SELECT CarID, Make,Model,YearOFManufacture,Color,CarType,Extras,PublishStatus,Price
	FROM CarInformation
END
ELSE IF @QryOption = @GET_EDIT_DATA
BEGIN
	SELECT CarID, Make,Model,YearOFManufacture,Color,CarType,Extras,PublishStatus,Price
	FROM CarInformation
	WHERE CarID = @CarID
END
ELSE IF @QryOption = @DELETE_DATA
BEGIN
	DELETE FROM CarInformation
	WHERE CarID = @CarID
END
ELSE IF @QryOption = @SAVE_IMAGE_DATA
BEGIN
	INSERT INTO CarImage(CarID,ImageName)VALUES(@CarID,@ImageName)
END
ELSE IF @QryOption = @LOAD_CAR_IMAGE_DATA
BEGIN
	SELECT ImageID,CarID,ImageName FROM CarImage
	WHERE CarID = @CarID
END
ELSE IF @QryOption = @DELETE_CAR_IMAGE_DATA
BEGIN
	DELETE FROM CarImage
	WHERE ImageID = @ImageID
END

ELSE IF @QryOption = @SELECT_ALL_DATA_INTERESTED_PERSON
BEGIN
	SELECT C.CarID, Make,Model,YearOFManufacture,Color,CarType,Extras,PublishStatus,Price,isnull(i.PersonInterested,0)PersonInterested
	FROM CarInformation c
	left join (select CARID,count(CustomerID)PersonInterested from Customer group by  CARID) i
	on c.CarID=i.CARID
END


--select CARID,count(CustomerID)PersonInterested from Customer group by  CARID
GO
/****** Object:  StoredProcedure [dbo].[SP_SET_CUSTOMER]    Script Date: 12/04/2022 4:30:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


CREATE PROCEDURE [dbo].[SP_SET_CUSTOMER]
@QryOption INT = -1,
@CustomerID INT = -1,
@CarID INT = -1,
@Name varchar(100)= '',
@Email varchar(100)= '',
@PhoneNumber varchar(100)= -1
AS

DECLARE @SAVE_DATA INT = 1,
@UPDATE_DATA INT = 2,
@SELECT_ALL_DATA INT= 3,
@GET_EDIT_DATA INT = 4,
@DELETE_DATA INT = 5,
@GET_CARWISE_INTERESTED_PERSON INT=6

IF @QryOption = @SAVE_DATA
BEGIN
	INSERT INTO Customer(Name,Email,PhoneNumber,DateAdded,CarID)
	VALUES(@Name,@Email,@PhoneNumber,GETDATE(),@CarID)
END

ELSE IF @QryOption = @UPDATE_DATA
BEGIN
	UPDATE Customer SET Name=@Name,Email=@Email,PhoneNumber=@PhoneNumber
		WHERE CustomerID = @CustomerID	
END
ELSE IF @QryOption = @SELECT_ALL_DATA
BEGIN
	SELECT CustomerID, Name,Email,PhoneNumber
	FROM Customer
END
ELSE IF @QryOption = @GET_EDIT_DATA
BEGIN
	SELECT CustomerID, Name,Email,PhoneNumber
	FROM Customer
	WHERE CustomerID = @CustomerID
END
ELSE IF @QryOption = @DELETE_DATA
BEGIN
	DELETE FROM Customer
	WHERE CustomerID = @CustomerID
END

ELSE IF @QryOption = @GET_CARWISE_INTERESTED_PERSON
BEGIN
	SELECT CustomerID, Name,Email,PhoneNumber FROM Customer
	WHERE CarID = @CarID
END
GO
