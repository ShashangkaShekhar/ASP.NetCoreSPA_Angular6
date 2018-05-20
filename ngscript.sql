USE [master]
GO
/****** Object:  Database [dbCore]    Script Date: 5/20/2018 1:33:53 PM ******/
CREATE DATABASE [dbCore]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'dbCore', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\dbCore.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'dbCore_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\dbCore_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [dbCore].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [dbCore] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [dbCore] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [dbCore] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [dbCore] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [dbCore] SET ARITHABORT OFF 
GO
ALTER DATABASE [dbCore] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [dbCore] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [dbCore] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [dbCore] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [dbCore] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [dbCore] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [dbCore] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [dbCore] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [dbCore] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [dbCore] SET  ENABLE_BROKER 
GO
ALTER DATABASE [dbCore] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [dbCore] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [dbCore] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [dbCore] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [dbCore] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [dbCore] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [dbCore] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [dbCore] SET RECOVERY FULL 
GO
ALTER DATABASE [dbCore] SET  MULTI_USER 
GO
ALTER DATABASE [dbCore] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [dbCore] SET DB_CHAINING OFF 
GO
ALTER DATABASE [dbCore] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [dbCore] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [dbCore] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'dbCore', N'ON'
GO
USE [dbCore]
GO
/****** Object:  Table [dbo].[User]    Script Date: 5/20/2018 1:33:53 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[User](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[FirstName] [nvarchar](250) NULL,
	[LastName] [nvarchar](250) NULL,
	[Email] [nvarchar](250) NULL,
	[Phone] [nvarchar](50) NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[User] ON 

INSERT [dbo].[User] ([Id], [FirstName], [LastName], [Email], [Phone]) VALUES (1, N'Shashangka', N'Shekhar', N'shashangka@gmail.com', N'01929515253')
INSERT [dbo].[User] ([Id], [FirstName], [LastName], [Email], [Phone]) VALUES (2, N'Shamim ', N'Uddin', N'shamim@gmail.com', N'03456456')
INSERT [dbo].[User] ([Id], [FirstName], [LastName], [Email], [Phone]) VALUES (3, N'Mahfuz ', N'Bappy', N'mahfuz@gmail.com', N'561532132')
INSERT [dbo].[User] ([Id], [FirstName], [LastName], [Email], [Phone]) VALUES (4, N'Ishani ', N'Isha', N'ishani@gmail.com', N'45645646444')
SET IDENTITY_INSERT [dbo].[User] OFF
USE [master]
GO
ALTER DATABASE [dbCore] SET  READ_WRITE 
GO
