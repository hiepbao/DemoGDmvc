# Giai đoạn 1: Build ứng dụng
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Sao chép file .csproj và khôi phục các dependencies
COPY *.csproj ./
RUN dotnet restore

# Sao chép toàn bộ mã nguồn và build ứng dụng
COPY . ./
RUN dotnet publish -c Release -o /out

# Giai đoạn 2: Runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app

# Sao chép từ giai đoạn build
COPY --from=build /out .

# Đặt biến môi trường để ứng dụng lắng nghe trên tất cả các địa chỉ
ENV ASPNETCORE_URLS=http://+:5000
EXPOSE 5000

# Lệnh để chạy ứng dụng
ENTRYPOINT ["dotnet", "DemoGDMVC.dll"]

